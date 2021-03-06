<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { createClient } from '$lib/data/inventoryClient';
    
    export const load: Load = async ({ fetch, session }) => {
		const inventoryClient = createClient(fetch);

		return {
			stuff: { inventoryClient },
			props: { inventoryClient }
		};
	};
</script>
<script lang="ts">
    import { orderStore as orders, filteredWorkOrders } from '$lib/data/orderStore';
    import { formatTableColumns, formatTableRows } from '$lib/charts/workOrderTable';
    import { filteredItems } from '$lib/data/itemStore';
    import { laborStore as filteredBomLabor } from '$lib/data/laborStore'
    import { cuttoffDate, daysIntoFuture } from '$lib/data/dateStore'
    import { formatTableColumns as formatItemTableColumns, formatTableRows as formatItemTableRows } from '$lib/charts/lineItemTable'
    import {  setClient } from '$lib/data/inventoryClient';
    
    import GTable from '$lib/charts/GTable.svelte';
    import { getFormattedDate, getLongFormattedDate } from '$lib/date-utils';
    import Toggle from '$lib/components/Toggle.svelte'
    import { getContext } from 'svelte';
    import Button from '$lib/SvelteTip/@Buttons/Button.svelte';
    import Input from '$lib/SvelteTip/@Form/Input.svelte';
    import type { Client } from '$lib/data/inventoryClient';

    let workOrderRefreshStamp: string = "";
    let laborRefreshStamp: string = "";
    let laborButtonLabel: string = "Extract Bom Labor";
    let viewQueryResults: boolean = false;
    const addSnack:any =getContext('addSnack')

    //set the client context for all sub layout routes
	export let inventoryClient: Client;
    setClient(inventoryClient)

    //reactive statements cannot directly await, must wrap in a function
    async function updateData():Promise<void>{
        addSnack({
            message: "Refreshing available open work orders",
            type: 'primary',
            duration: '4000',
            closeOnClick: true
        });

        $orders = await inventoryClient.updateOrders();
        workOrderRefreshStamp = "Updated " + getLongFormattedDate(new Date());
        if ($filteredBomLabor?.length < 1){
            addSnack({
                message: "Labor for part numbers does not exist, starting lookup. This could take a few minutes.",
                type: 'warn',
                duration: '4000',
                closeOnClick: true
            });
            updateLabor();
        }else{
            addSnack({
                message: "Open work orders up to date",
                type: 'success',
                duration: '2000',
                closeOnClick: true
            });
        }
     };
     
     async function updateLabor():Promise<void>{
        //wait for the work order line items to load before extracting labor from them
        if ($filteredItems?.length > 0){
            addSnack({
                message: "Gathering labor for inventory items",
                type: 'primary',
                duration: '4000',
                closeOnClick: true
            });
            laborButtonLabel = "Searching..."
            await inventoryClient.updateBomLabor($filteredItems);
        }
        addSnack({
            message: "Inventory items up to date",
            type: 'success',
            duration: '2000',
            closeOnClick: true
        });
        laborRefreshStamp = "Last Updated " + getLongFormattedDate(new Date());
        laborButtonLabel = "Refresh Bom Labor";
    };

    //run this at load
    $:updateData()

</script>

<aside class="flex">
    <div class='input'>
        <!-- <p>Forecast days into future</p>
        <input bind:value={$daysIntoFuture} type="number" aria-label="future forecast" minlength="1"> -->
        <Input bind:value={$daysIntoFuture} type='number' label='Days into future' regex='^[0-9.]+$' minLength='1' maxLength='10' />    
    </div>
    <div class="flex">
        <h3 class="spacing">Detailed View</h3>
        <Toggle bind:checked={viewQueryResults} margin={'0 0 0 0.5rem'}/>
    </div>
    <div>
        <Button onClick={updateData} useGradiant exactfit applyTheme='none' size='medium' text={'Refresh Work Orders'} />
    </div>
    <div>
        <Button onClick={updateLabor} useGradiant exactfit applyTheme='none' size='medium' text={laborButtonLabel} />  
    </div>
</aside>
<main class="block">
    <slot />
</main>

{#if viewQueryResults && $filteredWorkOrders}
<div style="height:600px;width:1200px;" class="block">
    <GTable
    title="Open Work Orders"
    cols={formatTableColumns($filteredWorkOrders)}
    rows={formatTableRows($filteredWorkOrders)}
    height={'600px'}
    />
</div>
<div style="height:600px;width:1200px;" class="block">
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
    <h2>Inventory</h2>
    <p>{laborRefreshStamp}</p>
    <p># Bom Labor Entries - {$filteredBomLabor?.length ?? 0}</p>
    {#if !$filteredBomLabor && laborRefreshStamp == ""}
    <p>Labor extraction not yet run</p>
    {:else if $filteredBomLabor?.length == 0}
    <p>No labor found in upcoming work orders</p>
    {:else}
    {#if viewQueryResults}
    <div>
        <h2>Labor Items</h2>
        <ul>
            {#each $filteredBomLabor as item}
            {#if item}
            <li>
                <h2>Item {item?.bomItemId}</h2>
                <p>Hours = {item?.hours ?? "no labor found"}</p>
            </li>
            {/if}
            {/each}
        </ul>
    </div>
    <div>
        <h2>Orders</h2>
        <p>{workOrderRefreshStamp}</p>
        <p># Work Orders - {$filteredWorkOrders?.length ?? 0}</p>
        <p># Items Attached to Work Orders - {$filteredItems?.length ?? 0}</p>
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
    {/if}
</div>
{/if}
    
<style>
    main{
        display: block;
        margin: auto;
    }
    .flex{
        margin: auto;
        display: flex;
        flex-direction: row;
    }
        .flex *{
            margin: 1rem;
        }
    
    .spacing{
        margin: 0.5rem;
    }
    .block{
        margin-bottom: 4rem;
    }
    .input{
        margin-top: -0.5rem;
    }
</style>