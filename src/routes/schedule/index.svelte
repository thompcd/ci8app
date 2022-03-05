<script lang="ts">
    import { orderStore as orders, filteredWorkOrders } from '$lib/data/orderStore';
    import { filteredItems } from '$lib/data/itemStore';
    import { formatTimelineColumns, formatTimelineRows } from '$lib/charts/workOrderTimeline'
    import { cuttoffDate } from '$lib/data/dateStore';
    
    import GTimeline from '$lib/charts/GTimeline.svelte';
    import TokenNotice from '$lib/components/TokenNotice.svelte';
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
