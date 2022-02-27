<script lang="ts">
	import PixiJs from '@external/PixiJs.svelte';
	import Button from '@button/Button.svelte';

	let pixiProps = null;

	const loadPixi = (filename) => {
		pixiProps = {
			pixifile: `/pixi/${filename}/${filename}.js`,
			resourceFolder: `/pixi/${filename}`
		};
	};

	loadPixi('starfield');
</script>

<div class="pixi-example">
	<div class="button-container">
		<Button
			nomargin
			onClick={() => {
				loadPixi('snowfield');
			}}>Snowfield</Button
		>
		<Button
			nomargin
			onClick={() => {
				loadPixi('starfield');
			}}>Starfield</Button
		>
	</div>
	<div class="pixi-area">
		{#if !!pixiProps}
			<PixiJs {...pixiProps} />
		{/if}
	</div>
</div>

<style lang="scss">
	.pixi-example {
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		gap: 10px;
	}

	.button-container {
		width: 100%;
		display: flex;
		gap: 10px;
	}

	.pixi-area {
		overflow: hidden;
		width: 100%;
		height: 400px;
	}
</style>
