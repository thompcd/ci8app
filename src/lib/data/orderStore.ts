import { derived, writable, get } from 'svelte/store';
import { getDate } from '../interfaces/customDateTime';
import { determineStage } from './custom';
import { retry, waitFor } from '../exponential-backoff';
import { browser } from "$app/env"
import { variables } from "../../variables"

import type { WorkOrder, WorkOrderLineItem, WorkOrderQueryResult } from '../interfaces/sos/workOrder';
import type { Writable, Readable } from 'svelte/store';
import type { BomItem } from '../interfaces/sos/bomItem';
import type { CustomDateTime } from '../interfaces/customDateTime';

//setup a work order store based on projected days into future requested
const today = new Date();
export const daysIntoFuture: Writable<number> = writable(3);
export const cuttoffDate: Readable<CustomDateTime> = derived(daysIntoFuture, $daysIntoFuture => getDate(today.setDate(today.getDate() + $daysIntoFuture)))
export const orderStore: Writable<WorkOrderQueryResult> = writable(null) // open work order query results

export const laborStore = writable(browser && JSON.parse(localStorage.getItem('labor'))) // initialized with a null value
// Anytime the store changes, update the local storage value.
laborStore.subscribe((value) => {
    if (browser) return localStorage.labor = JSON.stringify(value)
})

export const ignoredItemStore: Writable<Array<number>> = writable(browser && JSON.parse(localStorage.getItem('ignoredLaborIds')) || []) //a list of item id's that are verified not to be able to contain labor
ignoredItemStore.subscribe((value) => {
    if (browser) return localStorage.ignoredLaborIds = JSON.stringify(value)
});

export const filteredWorkOrders: Readable<WorkOrder[]> = derived([orderStore, cuttoffDate], ([$orderStore, $cutoffDate])=>
{
    let orders = $orderStore?.data;
    return orders?.filter(o => o.formattedDate.timestamp < $cutoffDate.timestamp)
});

export const filteredItems: Readable<WorkOrderLineItem[]> = derived(filteredWorkOrders, ($filteredWorkOrders) =>{
    let temp = [];
    console.log("getting filtered items")
    $filteredWorkOrders?.forEach(order =>{
        order?.lines?.forEach(lineItem =>{
            temp.push(lineItem)
        });
    });
    return temp;
});

export async function fetchBomItem(id:number):Promise<BomItem>{
    var myHeaders:Headers = new Headers();
    myHeaders.append("Authorization", variables.saddleOakToken);

    if(get(ignoredItemStore)?.includes(id) === true){
        console.log("skipping because it is ignored" + id)
        return null;
    }

    let result = await retry(
        fetch('https://api.sosinventory.com/api/v2/item/' + id + '/bom', {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        })
        .then((res) => {
            if (res.status == 429){
                throw new Error("Rate limit exceeded, please retry later")
            }else{
                return res.json();
            }
        })
        .then((j)=>{
            if (j.status == "unauthorized"){
                throw new Error("Rate limit exceeded, please retry later")
            }else{
                return j;
            }
        }),
        ((retryAttempt) => {
            console.log("Retrying")
        }),
        5,
        true
    );

    console.log("bom item fetch results")
    console.log(result)
    //on failures like 404 or item errors, add to ignore list
    if (result?.status === "failed"){
        // console.log("adding to ignore list" + id)
        ignoredItemStore.set([...get(ignoredItemStore), id])
    }

    let labor = result?.data?.find(d => d.componentItem?.id === 244);
    // console.log("filtered for labor on item " + id);
    // console.log(labor);

    //labor exists on this object, extract it
    if (labor ?? false){
        return {bomItemId: id, hours: labor?.quantity, error: null, item: labor };
    }
    else{
        return null;
    }
}

export async function updateBomLabor(items:WorkOrderLineItem[]):Promise<BomItem[]>{
    let t:BomItem[] = [];

    //remove any items in the ignore list
    items = items.filter(function(ele){ 
        return !get(ignoredItemStore).includes(ele.id); 
    });

    // console.log("Retrieving bom labor from open line items")
    // console.log(items)
    for(const item of items){
        console.log("fetching bom item " + item.id )
        await fetchBomItem(item.id)
            .then((r)=>{
                console.log("result")
                console.log(r)
                if (r != null){
                    t.push(r)
                }
            })
        //TODO: use backoff strategy instead of hardcoded rate limit
        await waitFor(500);
    }
    
    //update the store
    laborStore.set(t);

    const bomItems = get(laborStore);
    let tempOrders = Object.assign(get(orderStore));
    //update order store values w/labor results
    tempOrders?.data?.forEach(workOrder => {
        let woLabor:number = 0;
        workOrder.lines?.forEach(lineItem => {
            let laborItems = bomItems?.filter(s => s.bomItemId == lineItem.id)
            // console.log("labor items")
            // console.log(laborItems)
            laborItems.forEach(laborItem => {
                lineItem.wpLaborHours =  laborItem.hours * lineItem.outstandingQuantity
                woLabor += lineItem.wpLaborHours;
            });
        });
        workOrder.wpLaborHours = woLabor;
    });
    console.log(tempOrders);
    orderStore.set(tempOrders);
    return t;
}

//summing function
const sum = (previousValue, currentValue) => previousValue + currentValue;

//grab all open orders
//note: only data that needs to be visible on inital renders needs populated here
//other fields can be accessed via accessor functions
export async function updateOrders(): Promise<WorkOrderQueryResult>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", variables.saddleOakToken);
    let response = await fetch("https://api.sosinventory.com/api/v2/workorder?status=open", {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        })
    let result:WorkOrderQueryResult = await response.json();

    result?.data?.forEach(order => {
        order.formattedDate = getDate(order.date);
        order.stage = determineStage(order);
        order.wpLaborHours = order.customFields['WP Labor Time']?.value || 0;
        order.assemblyLaborHours = order.customFields['Assembly Labor']?.value || 0;
        order.woLocation = order.customFields['WO Location']?.value || '';
        order.backorder = order.customFields['Back Order']?.value || '';
        order.lines.forEach(item =>{
            item.hasOutstandingQuantity = (+item.produced <= +item.quantity);
            item.outstandingQuantity = +item.quantity - +item.shipped;
            item.open = +item.quantity - +item.produced
            item.order = order
            // item.dayUntilDue = new Date(item.duedate.getTime() - new Date().getTime())
        })
        //this requires line items to be populated before calculating
        order.totalOpenItems = order.lines.map(l => l.open).reduce(sum);
    })
    
    console.log(result)
    return result;
}
