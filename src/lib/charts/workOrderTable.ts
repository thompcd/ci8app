import type { WorkOrder } from "../interfaces/sos/workOrder";
import type { Column as TableColumn } from '../interfaces/table';

export function formatTableColumns(data: WorkOrder[]): TableColumn[]{
    return [ 
        {id:1,label: "Work Order #"},
        {id:2,label: "Customer"},
        {id:20,label: "Due Date"},
        {id:3,label: "Assigned To"},
        {id:4,label: "Order Notes"}
    ];
};

export function formatTableRows(data: WorkOrder[]){
    let temp = data?.map(s => [s.id, s.customer.name || '', s.formattedDate.pretty, s.assignedToUser.name || '', s.customerNotes || ''])
    console.log(temp)
    return temp;
}