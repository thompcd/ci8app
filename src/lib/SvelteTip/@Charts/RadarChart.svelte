<!-- <script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { browser } from '$app/env';

  import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    Filler,
  } from 'chart.js';

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    Filler,
  );

  export let title = '';
  export let legend = '';
  
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


  const buildData = () => {
    return {
      labels,
      datasets: [{
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

  onMount(() => {
    const config = {
      type: 'radar',
      data: buildData(),
      options: buildOptions()
    };   

    chart = new Chart(
      canvasEle,
      /* @ts-ignore */
      {...config}
    );    
  })

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
</style> -->
