<script lang="ts">
	import { onMount } from 'svelte';
  
  export let enterViewport = null;
  export let leaveViewport = null;

  let ele;

  onMount(() => {
    const intersectionObserver = new IntersectionObserver(function(entries) {
      entries[0].intersectionRatio <= 0 ? leaveViewport && leaveViewport() : enterViewport && enterViewport() 
    });
    // start observing
    intersectionObserver.observe(ele);    
  })

</script>

<section bind:this={ele}>
  <slot />
</section>

