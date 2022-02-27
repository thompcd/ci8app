import { getTooltip } from "./workOrderTooltip";
import { chartColors } from "./chartColors";
import { addDays } from "../date-utils";

import type { TimelineColumn } from "../interfaces/timeline";
import type { WorkOrder } from "../interfaces/sos/workOrder";

function isValidDate(d:any) {
	return (d !== '');
  }

export function formatTimelineRows(data: WorkOrder[]){
	let temp = [];
	//make an entry for every line item
	data?.forEach(order => {
		order?.lines?.forEach(lineItem =>{
			try{
				if (isValidDate(lineItem?.duedate)){
					temp.push([ 
						order?.id, 
						order?.assignedToUser?.name,
						getTooltip(order, lineItem),
						chartColors[order?.stage?.id || 1],
						addDays(lineItem?.duedate, -4, order?.date), 
						addDays(lineItem?.duedate, 1, order?.date)
					]);
				}else{
					console.log(`ignored item for invalid date ${lineItem}`);
				}
			}
			catch(error){
				console.log(`Failed to format timeline row ${error}`)
			}
		});
	});

	//make sure the items are date sorted for plotting optimization
	temp.sort(function(a, b){
		return +b.duedate - +a.duedate
	});
	console.log("timeline rows")
	console.log(temp)
	return temp;
}

export function formatTimelineColumns(data: WorkOrder[]): TimelineColumn[]{
	return [ 
			{type: "string", id:"Order #"},
			{type: "string",id: "Customer"},
			{type: "string", role: "tooltip", p: {role: "tooltip"}},
			{type: "string",id: "style", role: "style", p: {role: "style"}},
			{type: "date",id: "Start"},
			{type: "date",id: "End"}
		];
}