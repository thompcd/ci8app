import { getTooltip } from "./workOrderTooltip";
import { chartColors } from "./chartColors";
import { addDays } from "../date-utils";

import type { TimelineColumn } from "../interfaces/timeline";
import type { WorkOrder } from "../interfaces/sos/workOrder";

export function formatTimelineRows(data: WorkOrder[]){
	let temp = [];
	//make an entry for every line item
	data?.forEach(order => {
		order?.lines?.forEach(lineItem =>{
			temp.push([ 
			order?.id, 
			order?.assignedToUser?.name,
			getTooltip(order, lineItem),
			chartColors[order?.stage?.id || 1],
			addDays(lineItem?.duedate, -4, order?.date), 
			addDays(lineItem?.duedate, 1, order?.date)
		]);
		});
	});
	// console.log("timeline rows")
	// console.log(temp)
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