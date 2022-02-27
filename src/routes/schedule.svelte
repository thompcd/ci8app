<script context="module">
	export const ssr = false;
</script>
<script lang="ts">
    import { orderStore as orders, updateOrders, filteredWorkOrders, cuttoffDate, filteredItems, laborStore as filteredBomLabor, updateBomLabor, daysIntoFuture, laborStore } from '$lib/data/orderStore';
    import { formatTimelineColumns, formatTimelineRows } from '$lib/charts/workOrderTimeline'
    import { formatTableColumns, formatTableRows } from '$lib/charts/workOrderTable';
    import { formatTableColumns as formatItemTableColumns, formatTableRows as formatItemTableRows } from '$lib/charts/lineItemTable' 
    import { formatTableColumns as formatLaborColumns, formatTableRows as formatLaborRows } from '$lib/charts/laborScheduleBarChart'
    
    import Spinner from '$lib/components/Spinner.svelte';
    import GTable from '$lib/charts/GTable.svelte';
    import GTimeline from '$lib/charts/GTimeline.svelte';
    import GBars from '$lib/charts/GBars.svelte';
    import { getFormattedDate, getLongFormattedDate } from '$lib/date-utils';
    import TokenNotice from '$lib/components/TokenNotice.svelte';
    import Toggle from '$lib/components/Toggle.svelte'
    
    let workOrderRefreshStamp: string = "";
    let laborRefreshStamp: string = "";
    let laborButtonLabel: string = "Extract Bom Labor";
    let viewQueryResults: boolean = false;
    
    //reactive statements cannot directly await, must wrap in a function
    async function updateData():Promise<void>{
        // addToast("Refreshing available open work orders", 'info');
         $orders = await updateOrders();
        workOrderRefreshStamp = "Updated " + getLongFormattedDate(new Date());
        if ($filteredBomLabor?.length < 1){
            // addToast("Labor for part numbers does not exist, starting looking. This could take a few minutes.", 'warn');
            updateLabor();
        }
     };
     
     async function updateLabor():Promise<void>{
         //wait for the work order line items to load before extracting labor from them
         if ($filteredItems?.length > 0){
             laborButtonLabel = "Searching..."
             await updateBomLabor($filteredItems);
            }
            laborRefreshStamp = "Updated " + getLongFormattedDate(new Date());
            laborButtonLabel = "Refresh Bom Labor";
        };
        //run this at load
        $:updateData()
    
    </script>
    <aside class="flex">
        <div>
            <p>Forecast days into future</p>
            <input bind:value={$daysIntoFuture}>
            <p>Detailed View</p>
            <Toggle bind:checked={viewQueryResults}></Toggle>
        </div>
        <div>
            <button on:click={updateData}>Refresh Work Orders</button>
            <p>{workOrderRefreshStamp}</p>
            <p># Work Orders - {$filteredWorkOrders?.length ?? 0}</p>
            <p># Items Attached to Work Orders - {$filteredItems?.length ?? 0}</p>
        </div>
        <div>
            <button on:click={updateLabor}>{laborButtonLabel}</button>
            <p>{laborRefreshStamp}</p>
            <p># Bom Labor Entries - {$filteredBomLabor?.length ?? 0}</p>
            <!-- if we have our work order data -->
            {#if !$filteredBomLabor && laborRefreshStamp == ""}
            <p>Labor extraction not yet run</p>
            {:else if $filteredBomLabor?.length == 0}
            <p>No labor found in upcoming work orders</p>
            {:else}
            {#each $filteredBomLabor as item}
            {#if viewQueryResults}
                 <ul>
                     {#if item}
                     <li>
                         <h2>Item {item?.bomItemId}</h2>
                         <p>Hours = {item?.hours ?? "no labor found"}</p>
                     </li>
                     {/if}
                 </ul>
            {/if}
            {/each}
            {/if}
        </div>
        <div>
            <h2>Orders</h2>
            {#if $orders && $orders.count > 0 && viewQueryResults}
            <ul>
                {#each $orders.data as item}
                <li>
                    <h3>{item.id}</h3>
                    <p>Assembly Hours: {item.assemblyLaborHours}</p>
                    <p>Wire Prep Hours: {item.wpLaborHours}</p>
                    <p>Items:</p>
                    <ul>
                        {#each item.lines as line} 
                        <p>{line.id}</p>
                        {/each}
                    </ul>
                </li>
                {/each}
            </ul>
            {/if}
        </div>
    </aside>
    <main>
        {#if $filteredWorkOrders}
        <!-- TODO: Calculate height based on num of rows -->
        <div style="height:600px;width:1200px;">
            <GBars
            title="Labor Forecast"
            cols={formatLaborColumns($filteredWorkOrders)}
            rows={formatLaborRows($filteredWorkOrders)}
            height={'600px'}
            />
        </div>
            <div style="height:1000px;width:1200px">
                <GTimeline
                caption="Displaying open orders up to {$cuttoffDate.pretty}"
                cols={formatTimelineColumns($filteredWorkOrders)}
                rows={formatTimelineRows($filteredWorkOrders)}
                heightPx={1000}
                widthPx={1200}
                title="Upcoming Work Orders"
                ></GTimeline>
            </div>
            <div style="height:600px;width:1200px;">
                <GTable
                title="Open Work Orders"
                cols={formatTableColumns($filteredWorkOrders)}
                rows={formatTableRows($filteredWorkOrders)}
                height={'600px'}
                />
            </div>
            <div style="height:600px;width:1200px;">
                {#if $filteredItems}
                    <GTable
                    title="Open Inventory"
                    cols={formatItemTableColumns($filteredItems)}
                    rows={formatItemTableRows($filteredItems)}
                    height={'600px'}
                    />
                {/if}
            </div>
        <!-- if we don't have work order data but we did get a response (error state) -->
        {:else if $orders}
            <h2>Unable to get work order data</h2>
            <h2>{$orders?.message ?? ""}</h2>
    
            <TokenNotice />
        <!-- haven't received any response, awaiting query -->
        {:else}
            <Spinner visible={true} caption="Flipping bits..."></Spinner>
        {/if}
    
    
    </main>
    
    <style>
        main{
            display: block;
        }
        .flex{
            display: flex;
            flex-direction: row;
        }
            .flex *{
                margin: 1rem;
            }
    </style>