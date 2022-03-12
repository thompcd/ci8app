<script context="module">
	export const ssr = false;
</script>
<script lang="ts">
  import "@google-web-components/google-chart";
  import { chartColors as colors } from "./chartColors";

  import type { Column } from "../interfaces/table"

  // export let cols: Column[]
  // export let rows: any[]
  export let title: String = '';
  export let height: String = '400px';
  export let width: String = '800px';
  export let data;
  //TODO: option titles will only work if hard coded. Need to repaint / callback?
  // export let vAxisTitle: String = '';
  // export let hAxisTitle: String = '';

  let options;

  options = {
    // chart: {
    //         title: '',
    //         subtitle: '',
    //       },
    title: {title},
      isStacked: true,
        hAxis: {
          title: 'Build Date',
          format: 'h:mm a',
          // viewWindow: {
          //   min: [7, 30, 0],
          //   max: [17, 30, 0]
          // }
        },
        vAxis: {
          title: 'WP + Assembly Labor Hours'
        },
    backgroundColor: 'transparent',
    colorAxis: { colors: colors },
    titleTextStyle: { fontSize: 14, color: '#737373' },
    height: '100%',
    width: '100%',
  };

  // function formatToGChart(arrayCols, arrayRows) {
  //   // var data = google.visualization.arrayToDataTable([
  //   //     ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
  //   //      'Western', 'Literature', { role: 'annotation' } ],
  //   //     ['2010', 10, 24, 20, 32, 18, 5, ''],
  //   //     ['2020', 16, 22, 23, 30, 16, 9, ''],
  //   //     ['2030', 28, 19, 29, 30, 12, 13, '']
  //   //   ]);

  //   //annotations = work order ids
  //   //num bins = num unique pretty dates
  //   //array length = num bins

  //   console.log("formatting columns")
  //   //create a bin array for each unique value
  //   let temp = [];
  //   arrayRows.forEach(element => {
      
  //   });

  //   //push row value into array for bin
  //   return [arrayCols, ...arrayRows];
  // }

  // $: data = formatToGChart(cols, rows);

</script>
{#if title}
  <h2>{title}</h2>
{/if}
{#if data}
  <google-chart style='height:{height};width:{width};margin:auto;' data={data} type='column' options={options}></google-chart>
{:else}
  <h2>Loading...</h2>
{/if}

<style>
h2{
  text-align: center;
}
</style>