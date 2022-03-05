<script lang="ts">
    import { orderStore as orders, filteredWorkOrders } from '$lib/data/orderStore';
    import { laborStore as filteredBomLabor } from '$lib/data/laborStore'
    import { formatTableColumns as formatLaborColumns, formatTableRows as formatLaborRows } from '$lib/charts/laborScheduleBarChart'
    import GBars from '$lib/charts/GBars.svelte';
</script>

{#if  $filteredBomLabor}
    <div style="height:600px;width:1200px;">
        <GBars
        title="Labor Forecast"
        cols={formatLaborColumns($filteredWorkOrders)}
        rows={formatLaborRows($filteredWorkOrders)}
        height={'600px'}
        />
    </div>
{/if}