import { derived, writable, get } from 'svelte/store';
import { browser } from "$app/env"
import { filteredWorkOrders } from './orderStore';

import type { WorkOrder, WorkOrderLineItem } from '../interfaces/sos/workOrder';
import type { Writable, Readable } from 'svelte/store';

//a list of item id's that are verified not to be able to contain labor
export const ignoredItemStore: Writable<Array<number>> = writable(browser && JSON.parse(localStorage.getItem('ignoredLaborIds')) || []) 
ignoredItemStore.subscribe((value) => {
    if (browser) return localStorage.ignoredLaborIds = JSON.stringify(value)
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
