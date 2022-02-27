import type { WorkOrder } from "../interfaces/sos/workOrder";
import type { Column } from '../interfaces/table';

export function formatTableColumns(data: WorkOrder[]): Column[]{
    return [ 
        {id:2,label: "Labor Hours", type: "number"},
        {id:1,label: "Date", type: "date"}
    ];
};

export function formatTableRows(data: WorkOrder[]){
    let temp = data?.map(s => [
        s.wpLaborHours || '',
        s.formattedDate.timestamp
    ])
    console.log(temp)
    return temp;
}