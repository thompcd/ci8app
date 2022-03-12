import { getDate } from '../interfaces/customDateTime';
import { variables } from "../../variables"
import { retry, waitFor } from '../exponential-backoff';
import { get } from 'svelte/store';
import { ignoredItemStore } from './itemStore';
import { laborStore } from './laborStore';
import { orderStore } from './orderStore';
import { today } from './dateStore';
import { sum } from './utilities';

import type { BomItem } from '../interfaces/sos/bomItem';
import type { OrderStage, WorkOrder, WorkOrderLineItem, WorkOrderQueryResult } from '../interfaces/sos/workOrder';

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

function isValidDate(d:any) {
	return (d !== '');
  }

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
        //TODO: CHECK WHICH DATES ON ORDER MIGHT BE CAUSING THE TIMELINE OLDEST DATE TO BE SUPER OLD
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
            if (!isValidDate(item.duedate)){
                item.duedate = today;
                item.description += ' ITEM HAS AN INVALID DUE DATE';
            }
            // item.dayUntilDue = new Date(item.duedate.getTime() - new Date().getTime())
        })
        //this requires line items to be populated before calculating
        order.totalOpenItems = order.lines.map(l => l.open).reduce(sum);
    })
    
    console.log(result)
    return result;
}

function determineStage(order: WorkOrder):OrderStage{
    var priotityVar = order?.priority?.name;
    var priotityVarHold = priotityVar.indexOf("Hold");
    var stageVar = 0;
    if (order.assignedToUser.name == 'Admin'){				if(priotityVarHold == -1){stageVar = 6;} else {stageVar = 11;}}	
    else if(order.assignedToUser.name == 'Matt Rogers'){	if(priotityVarHold == -1){stageVar = 2;} else {stageVar = 11;}}
    else if (order.assignedToUser.name == 'Perry Purdum'){	if(priotityVarHold == -1){stageVar = 5;} else {stageVar = 11;}}
    else if(order.assignedToUser.name == 'Neil Peckham'){	if(priotityVarHold == -1){stageVar = 3;} else {stageVar = 12;}}
    else if (order.assignedToUser.name == 'Production') {	if(priotityVarHold == -1){stageVar = 4;} else {stageVar = 1;}}
    else {if(priotityVarHold == -1){stageVar = 4;} else {stageVar = 1;}
    }
    order.stage = { id: stageVar, syncToken: 0, name: "" };

    return order.stage;
}