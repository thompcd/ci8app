<script lang="ts">
	import { onDestroy, getContext } from 'svelte';
	import { browser } from '$app/env';

  const defaultSrc = 'https://cdn.jsdelivr.net/npm/chart.js';

  export let title = '';
  export let legend = '';
  export let datasetLabel = ''

  export let gridColor = 'black';
  export let gridColorHue = 0
  
  export let lineColor = 'black';
  export let lineColorHue = 'black';

  export let labels = []
  export let data = []

  let canvasEle;
  let chart; 

  const colors:any = getContext('colors');
  const theme:string = getContext('theme');

	const onScriptLoad = () => {
		/* @ts-ignore */
		if (typeof Chart !== 'undefined') {
      const config = {
        type: 'bar',
        data: buildData(),
        options: buildOptions()
      };   

		  /* @ts-ignore */
      chart = new Chart(
        canvasEle,
        /* @ts-ignore */
        {...config}
      );  
		}
	};


  const buildData = () => {
    return {
      labels,
      datasets: [{
        label: datasetLabel,
        backgroundColor: browser ? colors[lineColor][lineColorHue].color : 'black',
        borderColor: browser ? colors[lineColor][lineColorHue].color : 'black',
        data,
      }]
    };
  }

  const buildOptions = () => {
    return {
        scales: {        
          x: {                   
            grid: {              
              drawBorder: true,
              color: function(_context) {
                return browser ? colors[gridColor][gridColorHue].color : 'black'
              },
            }
          },
          y: {
            grid: {
              drawBorder: true,
              color: function(_context) {
                return browser ? colors[gridColor][gridColorHue].color : 'black'
              },
            },
          }
        }
      } 
  }

  onDestroy(() => {
    chart.destroy()
  })

  const update = () => {    
    chart.data = buildData()    
    chart.update();    
  }

  $: {    
    gridColor && !!chart && update()
    gridColorHue && !!chart && update()
    lineColor && !!chart && update()
    lineColorHue && !!chart && update()    
  }

</script>

<svelte:head>
	<script src={defaultSrc} on:load={onScriptLoad} />
</svelte:head>

<div class='linechart'>
  <div class='title'>
    <h2>{title}</h2>
  </div>
  <div class='canvas-container'>
    <canvas bind:this={canvasEle} />
  </div>
  <div class='legend'>
    <h5>{legend}</h5>
  </div>
</div>

<style lang="scss">
  .linechart{
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .canvas-container{
    display: flex; 
    width: 100%; 
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .title{
    margin-bottom: 10px;
  }

  .legend{
    margin-top: 10px;
  }
</style>
