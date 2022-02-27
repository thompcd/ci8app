<script lang="ts">
    import { orderStore as orders, updateOrders, filteredWorkOrders, cuttoffDate, filteredItems, laborStore as filteredBomLabor, updateBomLabor, daysIntoFuture, laborStore } from '$lib/data/orderStore';
    import { formatTimelineColumns, formatTimelineRows } from '$lib/charts/workOrderTimeline'
    import { formatTableColumns, formatTableRows } from '$lib/charts/workOrderTable';
    import { formatTableColumns as formatItemTableColumns, formatTableRows as formatItemTableRows } from '$lib/charts/lineItemTable' 
    import { formatTableColumns as formatLaborColumns, formatTableRows as formatLaborRows } from '$lib/charts/laborScheduleBarChart'
    
    // import Spinner from '$lib/components/Spinner.svelte';
    import GTable from '$lib/charts/GTable.svelte';
    import GTimeline from '$lib/charts/GTimeline.svelte';
    import GBars from '$lib/charts/GBars.svelte';
    import { getFormattedDate, getLongFormattedDate } from '$lib/date-utils';
    import TokenNotice from '$lib/components/TokenNotice.svelte';
    import Toggle from '$lib/components/Toggle.svelte'
    import { getContext } from 'svelte';
    import Button from '$lib/SvelteTip/@Buttons/Button.svelte';
import Spinner from '$lib/SvelteTip/@Layout/Spinner.svelte';
</script>
{#if $filteredWorkOrders && $filteredItems}
<!-- TODO: Calculate height based on num of rows -->
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
<!-- if we don't have work order data but we did get a response (error state) -->
{:else if $orders}
    <h2>Unable to get work order data</h2>
    <h2>{$orders?.message ?? ""}</h2>

    <TokenNotice />
<!-- haven't received any response, awaiting query -->
{:else}
<Spinner show size='large' applyTheme='auto' thickness='5'/>
{/if}
