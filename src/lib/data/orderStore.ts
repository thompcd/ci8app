import { derived, writable, get } from 'svelte/store';
import { cuttoffDate } from './dateStore';

import type { WorkOrder, WorkOrderQueryResult } from '../interfaces/sos/workOrder';
import type { Writable, Readable } from 'svelte/store';

// open work order query results
export const orderStore: Writable<WorkOrderQueryResult> = writable(null) 

export const filteredWorkOrders: Readable<WorkOrder[]> = derived([orderStore, cuttoffDate], ([$orderStore, $cutoffDate])=>
{
    let orders = $orderStore?.data;
    return orders?.filter(o => o.formattedDate.timestamp < $cutoffDate.timestamp)
});
