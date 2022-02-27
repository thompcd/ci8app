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