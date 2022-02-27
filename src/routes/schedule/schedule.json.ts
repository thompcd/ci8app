// import { orderStore as orders, updateOrders, filteredWorkOrders, cuttoffDate, filteredItems, laborStore as filteredBomLabor, updateBomLabor, daysIntoFuture, laborStore } from '$lib/data/orderStore';
// import { formatTimelineColumns, formatTimelineRows } from '$lib/charts/workOrderTimeline'
// import { formatTableColumns, formatTableRows } from '$lib/charts/workOrderTable';
// import { formatTableColumns as formatItemTableColumns, formatTableRows as formatItemTableRows } from '$lib/charts/lineItemTable' 
// import { formatTableColumns as formatLaborColumns, formatTableRows as formatLaborRows } from '$lib/charts/laborScheduleBarChart'

// import { getFormattedDate, getLongFormattedDate } from '$lib/date-utils';
// import { getContext } from 'svelte';

// let workOrderRefreshStamp: string = "";
// let laborRefreshStamp: string = "";
// let laborButtonLabel: string = "Extract Bom Labor";
// let viewQueryResults: boolean = false;
// const addSnack:any =getContext('addSnack')

// //reactive statements cannot directly await, must wrap in a function
// async function updateData():Promise<void>{
//     addSnack({
//         message: "Refreshing available open work orders",
//         type: 'primary',
//         duration: '4000',
//         closeOnClick: true
//     });
//     orders.set(await updateOrders());
//     workOrderRefreshStamp = "Updated " + getLongFormattedDate(new Date());

//     if ($filteredBomLabor?.length < 1){
//         addSnack({
//         message: "Labor for part numbers does not exist, starting looking. This could take a few minutes.",
//         type: 'warn',
//         duration: '4000',
//         closeOnClick: true
//         });
//         updateLabor();
//     }
//     };
    
//     async function updateLabor():Promise<void>{
//         //wait for the work order line items to load before extracting labor from them
//         if ($filteredItems?.length > 0){
//             laborButtonLabel = "Searching..."
//             await updateBomLabor($filteredItems);
//         }
//         laborRefreshStamp = "Updated " + getLongFormattedDate(new Date());
//         laborButtonLabel = "Refresh Bom Labor";
//     };

// export async function get({params}){

//     console.log("getting")
//     try{
//         var data = await updateData();
//         return {
//             status:200,
//             body:{
//                 data: data
//             }
//         }
//     }catch(error){
//         return {
//             status:500,
//             body:{
//                 data: error
//             }
//         }
//     }
// }