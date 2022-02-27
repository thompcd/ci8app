import type { WorkOrder, OrderStage } from "../interfaces/sos/workOrder";

export function determineStage(order: WorkOrder):OrderStage{
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