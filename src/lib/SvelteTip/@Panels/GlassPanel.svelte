<script lang="ts">
	import { onMount } from 'svelte';
	import TwoSlot from '@layout/TwoSlot.svelte';
	import ScrollWrapper from '@layout/ScrollWrapper.svelte';

	export let glassEffect = 'light';
	export let nopadding = false;
	export let nomargin = false;
	export let onHeaderClick = null;
	export let contentHeight = 'auto';
	export let skinnybar = false;
	export let rounded = false;
	export let shadow = false;
	export let shadowOnHover = false;
	export let open = false;
	export let noheader = false;
	export let blur = 7;
	export let textColor = 'black';
	export let fill = false;

	let eleHeight = null;
	let cHeight = null;
	let ready = false;

	onMount(() => {
		setTimeout(() => {
			ready = true;
		}, 0);
	});

	$: fillStyle = fill ? eleHeight - 20 : '';
</script>

<div
	class={`panel text-${textColor} glass-${glassEffect}`}
	class:nomargin
	class:rounded
	class:shadow
	class:shadowOnHover
	class:fill
	style={`backdrop-filter: blur(${blur || 0}px); -webkit-backdrop-filter: blur(${blur || 0}px);`}
	bind:clientHeight={eleHeight}
>
	{#if !noheader}
		<div
			class="header"
			class:nopadding
			class:clickable={!!onHeaderClick}
			on:click={() => {
				onHeaderClick && onHeaderClick();
			}}
		>
			<TwoSlot nopadding>
				<div slot="left">
					<slot name="title" />
				</div>

				<div slot="right">
					<slot name="action" />
				</div>
			</TwoSlot>
		</div>
	{/if}

	<div
		class="content"
		class:nopadding
		class:animate={ready}
		bind:clientHeight={cHeight}
		style={open
			? `margin-top: 0; opacity: 1; ${fillStyle}px`
			: `margin-top: -${cHeight - 2}px; opacity: 0; ${fillStyle}px`}
	>
		<ScrollWrapper height={fill ? `${fillStyle}px` : contentHeight} {skinnybar}>
			<slot name="content" />
		</ScrollWrapper>
	</div>
</div>

<style lang="scss">
	.panel {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		overflow: hidden;

		$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white';
		@each $theme in $themes {
			&.text-#{$theme} {
				color: var(--#{$theme}-0);
			}
		}

		&.fill {
			height: 100%;
			.content {
				height: 100%;
			}
		}

		&.glass-light {
			background: rgba(255, 255, 255, 0.75);
		}

		&.glass-dark {
			background: rgba(0, 0, 0, 0.75);
		}

		&.glass-semi-light {
			background: rgba(255, 255, 255, 0.5);
		}

		&.glass-semi-dark {
			background: rgba(0, 0, 0, 0.25);
		}

		&.shadow {
			box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
		}

		&.shadowOnHover {
			&:hover {
				box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
			}
		}

		&.rounded {
			border-radius: 10px;
		}

		&.nomargin {
			margin: 0;
		}

		.header {
			z-index: 2;
			padding: 5px 10px;
			background: rgba(0, 0, 0, 0.25);
			&.clickable {
				cursor: pointer;
			}
		}

		.content {
			z-index: 1;
			transition: 0;
			padding: 10px;

			&.animate {
				transition: 0.3s;
			}

			&.open {
				margin-top: 0;
			}

			&.nopadding {
				padding: 0;
			}
		}
	}
</style>
