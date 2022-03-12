<script lang="ts">
    import { orderStore as orders, filteredWorkOrders } from '$lib/data/orderStore';
    import { laborStore as filteredBomLabor } from '$lib/data/laborStore'
    import { formatStackedItems, formatTableColumns as formatLaborColumns, formatTableRows as formatLaborRows } from '$lib/charts/laborScheduleBarChart'
    import GBars from '$lib/charts/GBars.svelte';

    $:console.log($filteredWorkOrders)
</script>

{#if  $filteredBomLabor}
    <div style="height:600px;width:1200px;">
        <GBars
        title="Labor Forecast"
        data={formatStackedItems($filteredWorkOrders)}
        height={'600px'}
        />
    </div>
    {:else}
    <div>
        <p>Awaiting BOM Labor Extraction</p>
    </div>
{/if}