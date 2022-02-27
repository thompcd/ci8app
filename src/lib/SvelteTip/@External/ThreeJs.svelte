<script lang="ts">
	import { tick } from 'svelte';
	import Spinner from '@layout/Spinner.svelte';
	export let threeFile = null;
	export let resourceFolder = null;
	export let id = 'instance1';

	const threeJsSrcDefault = 'https://cdn.jsdelivr.net/npm/three@0.130.1/build/three.min.js';

	let hasError = false;
	let isLoading = true;
	let canvasele = null;

	let setTimeoutEvent = null;

	const onScriptLoad = () => {
		/* @ts-ignore */
		if (typeof THREE !== 'undefined') {
			!!threeFile && initLoad(threeFile);
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
			threeInit({
				canvasele,
				resourceFolder,
				fullscreen: true,
				width: window.innerWidth,
				height: 400
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
			initLoad(threeFile);
		}
	};

	$: {
		threeFile && newLoad();
		resourceFolder && newLoad();
		id && newLoad();
	}
</script>

<svelte:head>
	<script src={threeJsSrcDefault} on:load={onScriptLoad}>
	</script>
</svelte:head>

<div class="threejs-container">
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
	.threejs-container {
		width: 100%;
		height: 100%;
		min-height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
