<script lang="ts">
	import { getContext } from 'svelte';

	export let show = false;
	export let rounded = false;
	export let applyTheme = 'primary';
	export let skinny = false;
	export let nobg = false;
	export let fade = false;
	export let nomargin = false;

	const theme: string = getContext('theme');
</script>

{#if show}
	<div class={`loader ${theme}-theme`} class:nomargin class:nobg class:rounded class:skinny>
		<div class={`line ${applyTheme}`} class:fade class:rounded />
	</div>
{/if}

<style lang="scss" scoped>
	.loader {
		background: var(--white-5);
		width: 100%;
		height: 10px;
		overflow: hidden;
		position: relative;
		margin: 2px 0;

		&.nobg {
			background: transparent !important;
		}

		&.skinny {
			height: 2px;
		}

		&.rounded {
			border-radius: 10px;
		}

		&.nomargin {
			margin: 0;
		}

		.line {
			position: absolute;
			left: 0;
			z-index: 1;
			width: 300px;
			height: 10px;
			animation: line-bounce 1500ms infinite;

			$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white';
			@each $theme in $themes {
				&.#{$theme} {
					background: var(--#{$theme}-0);
				}
			}

			&.rounded {
				border-radius: 10px;
			}

			&.fade {
				animation: fade-out 1000ms infinite;
			}
		}

		&.dark-theme {
			background: var(--black-4);
		}
	}

	@keyframes line-bounce {
		0% {
			left: calc(100% - 300px);
		}
		50% {
			left: 0;
		}
		100% {
			left: calc(100% - 300px);
		}
	}

	@keyframes fade-out {
		0% {
			left: calc(0%);
			opacity: 1;
		}
		100% {
			left: calc(100%);
			opacity: 0;
		}
	}
</style>
