<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import TwoSlot from '@layout/TwoSlot.svelte';
	import ScrollWrapper from '@layout/ScrollWrapper.svelte';

	export let applyTheme = 'default';
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
	export let contentstyle = '';

	const theme: string = getContext('theme');

	let cHeight = null;
	let ready = false;

	onMount(() => {
		setTimeout(() => {
			ready = true;
		}, 0);
	});

	$: useType = applyTheme === 'default' ? (theme === 'dark' ? 'black' : 'white') : applyTheme;
</script>

<div class={`panel ${useType}`} class:nomargin class:rounded class:shadow class:shadowOnHover>
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
			? `margin-top: 0; ${contentstyle}`
			: `margin-top: -${cHeight + 2}px; ${contentstyle}`}
	>
		<ScrollWrapper height={contentHeight} {skinnybar}>
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

		$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
		@each $theme in $themes {
			&.#{$theme} {
				.header {
					background: var(--#{$theme}-4) !important;
					color: var(--#{$theme}-4-text) !important;
				}

				.content {
					background: var(--#{$theme}-0) !important;
					color: var(--#{$theme}-0-text) !important;
					border: 1px solid var(--#{$theme}-0) !important;
				}
			}
		}

		&.none {
			width: calc(100% - 2px);
			.header {
				background: var(--black-2);
				color: var(--black-2-text);
			}

			.content {
				background: inherit;
				color: inherit;
				border: 1px solid var(--black-2);
			}
		}

		&.black {
			.header {
				background: var(--black-2);
				color: var(--black-2-text);
			}

			.content {
				background: var(--black-3);
				color: var(--black-3-text);
				border: 1px solid var(--black-3);
			}
		}

		&.white {
			.header {
				background: var(--white-7);
				color: var(--white-7-text);
			}

			.content {
				background: var(--white-2);
				color: var(--white-2-text);
				border: 1px solid var(--white-2);
			}
		}
	}
</style>
