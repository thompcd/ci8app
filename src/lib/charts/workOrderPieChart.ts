import type { WorkOrder } from "../interfaces/sos/workOrder"
import type { Column } from "../interfaces/pie"

export function backlogLineItemColumns(data: WorkOrder[]): Column[]{
    return [ 
        {type: "string", label: "Task"},
        {type: "number", label: "Backlog"},
    ];
};

export function backlogLineItemRows(orders: WorkOrder[]){
    let temp = [];
	console.log("running pie rows")
	//make an entry for every line item
	orders?.forEach(order => {
		order?.lines?.forEach(lineItem =>{
			temp.push([ 
				order?.customer?.name,
				lineItem.open
			]);
		});
	});
	
	console.log("pie rows")
	console.log(temp)
	return temp;
}