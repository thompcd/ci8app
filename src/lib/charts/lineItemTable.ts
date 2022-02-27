import type { WorkOrderLineItem } from "../interfaces/sos/workOrder";
import type { Column as TableColumn } from '../interfaces/table';

export function formatTableColumns(data: WorkOrderLineItem[]): TableColumn[]{
    return [ 
        {id:1,label: "Item #"},
        {id:2,label: "Description"},
        {id:20,label: "Work Order"},
        {id:4,label: "Qty Awaiting"},
        {id:5,label: "Qty Awaiting Ship"}
    ];
};

export function formatTableRows(data: WorkOrderLineItem[]){
    let temp = data?.map(s => [
        s.id, 
        s.description || '', 
        s.order?.id ?? 0,
        s.outstandingQuantity,
        s.open || 0
    ])
    console.log(temp)
    return temp;
}