<script context="module">
	export const ssr = false;
</script>
<script lang="ts">
  import "@google-web-components/google-chart";
  import { chartColors as colors } from "./chartColors";

  import type { Column } from "$lib/interfaces/table"
import { onMount } from "svelte";

  export let cols: Column[]
  export let rows: any[]
  export let title: String = '';
  export let height: String = '400px';
  export let width: String = '800px';

  let options;
  let data;

  options = {
    backgroundColor: 'transparent',
    colorAxis: { colors: colors },
    titleTextStyle: { fontSize: 14, color: '#737373' },
    height: '100%',
    width: '100%'
  };

  function formatToGChart(arrayCols, arrayRows) {
    // console.log("formatting table " + title)
    // console.log(arrayCols)
    // console.log(arrayRows)
    return [arrayCols, ...arrayRows];
  }

  onMount(()=>{
    data = formatToGChart(cols, rows);
  });

</script>
{#if title}
  <h2>{title}</h2>
{/if}
{#if data}
  <google-chart style='height:{height};width:{width};margin:auto;' data={data} type='table' options={options}></google-chart>
{:else}
  <h2>Loading...</h2>
{/if}

<style>
h2{
  text-align: center;
}
</style>