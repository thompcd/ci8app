<script lang="ts">
	export let headerTag = 'none';
</script>

{#if headerTag === 'none'}
	<slot />
{/if}
{#if headerTag === 'h1'}
	<h1><slot /></h1>
{/if}
{#if headerTag === 'h2'}
	<h2><slot /></h2>
{/if}
{#if headerTag === 'h3'}
	<h3><slot /></h3>
{/if}
{#if headerTag === 'h4'}
	<h4><slot /></h4>
{/if}
{#if headerTag === 'h5'}
	<h5><slot /></h5>
{/if}
{#if headerTag === 'h6'}
	<h6><slot /></h6>
{/if}
