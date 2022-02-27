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
    import { getContext } from 'svelte';
    import Button from '$lib/SvelteTip/@Buttons/Button.svelte';

    let workOrderRefreshStamp: string = "";
    let laborRefreshStamp: string = "";
    let laborButtonLabel: string = "Extract Bom Labor";
    let viewQueryResults: boolean = false;
    const addSnack:any =getContext('addSnack')

        
    //reactive statements cannot directly await, must wrap in a function
    async function updateData():Promise<void>{
        addSnack({
            message: "Refreshing available open work orders",
            type: 'primary',
            duration: '4000',
            closeOnClick: true
        });
         $orders = await updateOrders();
        workOrderRefreshStamp = "Updated " + getLongFormattedDate(new Date());
        if ($filteredBomLabor?.length < 1){
            addSnack({
            message: "Labor for part numbers does not exist, starting looking. This could take a few minutes.",
            type: 'warn',
            duration: '4000',
            closeOnClick: true
            });
            updateLabor();
        }
     };
     
     async function updateLabor():Promise<void>{
        //wait for the work order line items to load before extracting labor from them
        if ($filteredItems?.length > 0){
            console.log("updating labor")
            laborButtonLabel = "Searching..."
            await updateBomLabor($filteredItems);
        }
        else{
            console.log("not updating labor");
        }
            laborRefreshStamp = "Updated " + getLongFormattedDate(new Date());
            laborButtonLabel = "Refresh Bom Labor";
        };

    //run this at load
    $:updateData()
    // // todo: may force to be "context='module'"
    // export async function load({params}){
    //     const response = await fetch(`/schedule`);
    //     const data = await response.json();

    //     return {
    //         props: data
    //     }
    // }

</script>

<aside class="flex">
    <div>
        <p>Forecast days into future</p>
        <input bind:value={$daysIntoFuture}>
    </div>
    <div>
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
        <Button on:click={updateLabor} useGradiant exactfit applyTheme='none' size='medium' text={laborButtonLabel} />  
    </div>
</aside>
<main>
    <slot />
</main>

{#if viewQueryResults && $filteredWorkOrders}
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
<div>
    <p>{laborRefreshStamp}</p>
    <p># Bom Labor Entries - {$filteredBomLabor?.length ?? 0}</p>
    {#if !$filteredBomLabor && laborRefreshStamp == ""}
    <p>Labor extraction not yet run</p>
    {:else if $filteredBomLabor?.length == 0}
    <p>No labor found in upcoming work orders</p>
    {:else}
    {#each $filteredBomLabor as item}
    {#if viewQueryResults}
        <div>
            <h2>Items</h2>
            <ul>
                {#if item}
                <li>
                    <h2>Item {item?.bomItemId}</h2>
                    <p>Hours = {item?.hours ?? "no labor found"}</p>
                </li>
                {/if}
            </ul>
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
    {/if}
    {/each}
    {/if}
</div>
{/if}
    
<style>
    main{
        display: block;
        margin: auto;
    }
    .flex{
        display: flex;
        flex-direction: row;
    }
        .flex *{
            margin: 1rem;
        }
</style>