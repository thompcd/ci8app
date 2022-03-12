import type { WorkOrder } from "../interfaces/sos/workOrder";
import type { Column } from '../interfaces/table';

export function formatTableColumns(data: WorkOrder[]): Column[]{
    var dateArray = data.map(w => w.formattedDate.pretty)
    console.log("grabbing dates")
    console.log(dateArray)



    let temp = [];
    for (let index = 0; index < uniqueVals.length; index++) {
        temp.push({id: index, label: uniqueVals[index], type: "date"})
    }
    console.log("formatted columns")
    console.log(temp)
    return temp;
    // return [ 
        // {id:2,label: "Labor Hours", type: "number"},
        // {id:1,label: "Date", type: "date"}

    // ];
};

export function formatTableRows(data: WorkOrder[]){
    let temp = data?.map(s => [
        s.wpLaborHours || '',
        s.formattedDate.timestamp
    ])
    console.log(temp)
    return temp;
}

export function formatStackedItems(data: WorkOrder[]){
    var dateArray = data
    .sort((a,b)=> +a.formattedDate.timestamp - +b.formattedDate.timestamp) //ascending
    .map(w => w.formattedDate.pretty) //output pretty dates

    //Set will capture distinct values in a new object
    let uniqueVals = [... new Set(dateArray)];
    console.log(uniqueVals)

    //chunk by work order
    var bins = data.map(w => w.id.toString())
    //ensure we're unique
    let uniqueIds = [ ... new Set(bins)]
    //first element in first row is a descriptor
    uniqueIds.unshift("work order id")

    let temp = [];
    temp.push(uniqueIds);
    console.log("only customers")
    console.log(temp)

    uniqueVals.forEach(element => {
        var rowData = [];
        //first entry per row is the bin filter
        rowData.push(element);

        //remaining elements are value per work order
        data.forEach(e =>{
            if (e.formattedDate.pretty == element){
                rowData.push((+e.assemblyLaborHours || 0 ) + (+e.wpLaborHours || 0))
            }else{
                rowData.push(0)
            }
        });
        temp.push(rowData)
    });
    console.log(temp);
    return temp;
}