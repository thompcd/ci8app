<script context="module">
	export const ssr = false;
</script>
<script lang="ts">
  import "@google-web-components/google-chart";
  import { chartColors as colors } from './chartColors'
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  import type { TimelineColumn, SelectedEventData, TimelineRow } from '$lib/interfaces/timeline';
  import { addDays } from "$lib/date-utils";
  import { cuttoffDate } from "$lib/data/orderStore";
import { UrlMap } from "$lib/data/urlMap";

  export let cols: TimelineColumn[]
  export let rows: any[]
  export let title: String = "Timeline";
  export let caption: String = $cuttoffDate.pretty;
  export let heightPx: number = 300;
  export let widthPx: number = 300;

  const dispatch = createEventDispatcher();

  let options;
  let data;
  let windowObjectReference = null;
  let timelineElement;
  let todayMarkerLineColor: String = "blue";
  let todayMarkerTextColor: String = "blue";
  let todayMarkerTextContent: String = "Today";

  options = {
    timeline: { showRowLabels: false},
    tooltip: { isHtml: true },
    backgroundColor: "transparent",
    colorAxis: { colors: colors },
    height: heightPx,
    width: widthPx
  };
  
  function formatToGChart(arrayCols, arrayRows) {
    return [arrayCols, ...arrayRows];
  }

  function selectedItemClickHandler(e){
    const selection:SelectedEventData[] = e.detail.chart.getSelection();
    //raise the event to other components
    dispatch("select", {
      selection,
      data: selection[selection.length - 1],
    });

    //TODO: move this out to the app layer
    //handle the internal event action
    let selectedOrder: TimelineColumn = rows[selection[0].row]
    var link = UrlMap.get('WorkOrderView') + (selectedOrder[0] ?? '');
    console.log(link)

    windowObjectReference = window.open(link, '_blank'); //'_blank' means start a new tab
    //must already be logged in for link to work
    //option exists to re-use same window rather than new window if needed

    if (windowObjectReference == null){
      alert('A window failed to open, check that it was not blocked by your browser.')
    }
  }

  //this function was written to query the dom but svelte hides it behind a shadowRoot object.
  function addMarker(parentElement, markerDate: Date, minDate: Date, endDate: Date) {
          var baseline;
          var baselineBounds;
          var chartElements;
          var markerLabel;
          var markerLine;
          var markerSpan;
          var svg;
          var timeline;
          var timelineUnit;
          var timelineWidth;
          var timespan;
          var dateRangeStart;
          var dateRangeEnd;

          baseline = null;
          timeline = null;
          svg = null;
          markerLabel = null;
          // let container = parentElement

          var chartEl = document.querySelector("#timeline")
          console.log(chartEl)
          var container = chartEl.shadowRoot;


          chartElements = container.querySelector('svg');
          console.log("svg")
          console.log(chartElements)
          if (chartElements.length > 0) {
            svg = chartElements[0];
          }
          // chartElements = container.getElementsByTagName('rect');
          // if (chartElements.length > 0) {
          //   timeline = chartElements[0];
          // }
          // chartElements = container.getElementsByTagName('path');
          // if (chartElements.length > 0) {
          //   baseline = chartElements[0];
          // }
          // chartElements = container.getElementsByTagName('text');
          // if (chartElements.length > 0) {
          //   markerLabel = chartElements[0].cloneNode(true);
          // }

          //we need at least these values to draw
          if ((svg === null) || (timeline === null) || (baseline === null) || (markerLabel === null) ||
              (markerDate.getTime() < dateRangeStart.min.getTime()) ||
              (markerDate.getTime() > dateRangeEnd.max.getTime())) {
            return;
          }

          // calculate placement
          timelineWidth = parseFloat(timeline.getAttribute('width'));
          baselineBounds = baseline.getBBox();
          timespan = dateRangeEnd.max.getTime() - dateRangeStart.min.getTime();
          timelineUnit = (timelineWidth - baselineBounds.x) / timespan;
          markerSpan = markerDate.getTime() - dateRangeStart.min.getTime();

          // add label
          markerLabel.setAttribute('fill', todayMarkerTextColor);
          markerLabel.setAttribute('y', options.height - 2);
          markerLabel.setAttribute('x', (baselineBounds.x + (timelineUnit * markerSpan) - 4));
          // markerLabel.textContent = formatDate.formatValue(markerDate);
          markerLabel.textContent = todayMarkerTextContent;

          svg.appendChild(markerLabel);

          // add line
          markerLine = timeline.cloneNode(true);
          markerLine.id = "dateMarker";
          markerLine.setAttribute('y', 0);
          markerLine.setAttribute('x', (baselineBounds.x + (timelineUnit * markerSpan)));
          markerLine.setAttribute('height', options.height - 16);
          markerLine.setAttribute('width', 1);
          markerLine.setAttribute('stroke', 'none');
          markerLine.setAttribute('stroke-width', '0');
          markerLine.setAttribute('fill', todayMarkerLineColor);
          markerLine.setAttribute('opacity', 0.4);

          svg.appendChild(markerLine);
        } 
  $: data = formatToGChart(cols, rows);
  // $: addMarker(
  //   chartElement, 
  //   new Date(), 
  //   addDays(new Date(), 3, new Date()),
  //   addDays(new Date(), -3, new Date())
  //   );

  //wait for the timeline to render
  $: if (timelineElement) {
    // console.log("rendered timeline")
    // console.log(timelineElement)
    // console.log(timelineElement.shadowRoot)
    // addMarker(timelineElement, new Date(), addDays(new Date(), -3, new Date()), addDays(new Date(), 30, new Date()))
  }

</script>
{#if title}
<h2>{title}</h2>
{/if}
{#if caption}
<p>{caption}</p>
{/if}
{#if data}
<google-chart 
  style='height:{heightPx}px;width:{widthPx}px;margin:auto;' 
  bind:this={timelineElement}
  on:google-chart-select={(e) => {selectedItemClickHandler(e)}}
  data={data} 
  type='timeline' 
  options={options}>
</google-chart>
{:else}
  <h2>Loading...</h2>
{/if}

<style>
  h2{
    text-align: center;
    margin-bottom: 0.1rem;
  }
  p{
    text-align: center;
    margin: 0 0.2rem;
  }
</style>