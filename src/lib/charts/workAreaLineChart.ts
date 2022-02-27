import type { WorkOrder } from "../interfaces/sos/workOrder";
import type { Column } from '../interfaces/line';

export function formatTableColumns(data: WorkOrder[]): Column[]{
    return [ 
        {type:'string',label: "Month"},
        {type:'number',label: "Backlog-WP"},
        {type:'number',label: "Backlog-Assy"},
        {type:'number',label: "Total"}
    ];
};

export function formatTableRows(data: WorkOrder[]){
    let temp = data?.map(s => [s.id, s.customer.name || '', s.formattedDate.pretty, s.assignedToUser.name || '', s.customerNotes || ''])
    console.log(temp)
    return temp;
}