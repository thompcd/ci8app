import { getFormattedDate } from "../date-utils";
import type { WorkOrder, WorkOrderLineItem } from "../interfaces/sos/workOrder";

export function getTooltip(order: WorkOrder, item: WorkOrderLineItem) {
    var optionalComment = (order.comment == null ? '' : ('<p>Comment: '+ order.comment + '</p>'));
    var optionalDate = (item["duedate"] == null ? '' : ('<p>Due: '+ getFormattedDate(new Date(item["duedate"]))) + '</p>');
    var optionalDate1 = (order["priority"]?.name == null ? '' : ('<p>Status: '+ order["priority"].name) + '</p>');
 
    var terms = order.assignedToUser.name || ' ';
    var itemString = getItem(order, item);

    return '<div style="padding:20px;">' 
          + itemString
          + optionalDate
          + optionalDate1
          + '<p>' + 'Assigned: '+ terms + '</p>' + '<hr>'
          + optionalComment
          + '</div>';
  }

export function getItem(order: WorkOrder, item: WorkOrderLineItem){
    if (item == null || item == undefined || item?.item?.name == ""){
        return "";
    }
    else{
        return  '<p>' + 'WO '+order?.id + ' (' + item?.produced +'/'+ item?.quantity + ') ' + item?.item?.name +': ' + item?.description
    }
}
  