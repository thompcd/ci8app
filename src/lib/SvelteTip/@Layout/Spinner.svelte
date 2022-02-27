<script lang="ts">
	import { getContext } from 'svelte';

	export let show = false;
	export let applyTheme = 'primary';
	export let size = 'medium';
	export let thickness = '3';
	export let nomargin = false;

	const theme: string = getContext('theme');
	const colors: string = getContext('colors');

	$: spinColor = () => {
		if (!!colors) {
			return !!applyTheme && !!colors[applyTheme]
				? colors[applyTheme][0].color
				: theme === 'dark'
				? 'white'
				: 'black';
		} else {
			return 'black';
		}
	};

	$: style = `border: ${thickness}px solid ${
		theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
	}; border-top-color: ${spinColor()}; border-radius: 50%;`;
</script>

{#if show}
	<div class="spinner-container" class:nomargin>
		<div class={`spinner ${theme}-theme ${size}`} {style} />
	</div>
{/if}

<style lang="scss" scoped>
	.spinner-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 10px 0;

		&.nomargin {
			margin: 0;
		}
	}

	.spinner {
		display: inline-block;
		animation: spin 1s ease-in-out infinite;
		-webkit-animation: spin 1s ease-in-out infinite;

		&.tiny {
			width: 10px;
			height: 10px;
		}

		&.small {
			width: 25px;
			height: 25px;
		}

		&.medium {
			width: 50px;
			height: 50px;
		}

		&.large {
			width: 100px;
			height: 100px;
		}
	}

	@keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
	@-webkit-keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
</style>
