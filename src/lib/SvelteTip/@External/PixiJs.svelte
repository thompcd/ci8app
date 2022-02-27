<script lang="ts">
	import { tick } from 'svelte';
	import Spinner from '@layout/Spinner.svelte';
	export let pixifile = null;
	export let resourceFolder = null;
	export let id = 'instance1';

	const defaultSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js';

	let hasError = false;
	let isLoading = true;
	let canvasele = null;

	let setTimeoutEvent = null;

	const onScriptLoad = () => {
		/* @ts-ignore */
		if (typeof PIXI !== 'undefined') {
			!!pixifile && initLoad(pixifile);
		}
	};

	const initLoad = async (file) => {
		hasError = false;
		isLoading = true;
		try {
			await loadFile(file);
			isLoading = false;
			await tick();
			/* @ts-ignore */
			pixiInit({
				canvasele,
				resourceFolder,
				fullscreen: true,
				width: window.innerWidth,
				height: 300
			});
		} catch (_err) {
			hasError = true;
			isLoading = false;
		}
	};

	const loadFile = (file) => {
		isLoading = true;
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.onload = resolve;
			script.onerror = reject;
			script.src = file;
			document.head.append(script);
		});
	};

	const newLoad = () => {
		if (!isLoading) {
			clearTimeout(setTimeoutEvent);
			initLoad(pixifile);
		}
	};

	$: {
		pixifile && newLoad();
		resourceFolder && newLoad();
		id && newLoad();
	}
</script>

<svelte:head>
	<script src={defaultSrc} on:load={onScriptLoad}></script>
</svelte:head>

<div class="pixijs-container">
	{#if isLoading}
		<Spinner show size="small" />
	{:else}
		<section>
			{#if hasError}
				<p>There has been an error.</p>
			{:else}
				<canvas {id} bind:this={canvasele} />
			{/if}
		</section>
	{/if}
</div>

<style lang="scss">
	.pixijs-container {
		width: 100%;
		height: 100%;
		min-height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
