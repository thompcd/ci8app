<script lang="ts">
	import { getContext } from 'svelte';

	export let nomargin = false;
	export let outline = false;
	export let open = false;
	export let titleSize = 'normal';
	export let contentSize = 'small';
	export let titleTheme = 'default';
	export let contentTheme = 'default';

	export let title = '';
	export let content = '';

	export let onClick = null;

	let ele = null;

	const returnOnClick = () => {
		onClick && onClick({ open: !ele.open });
	};

	const theme: string = getContext('theme');
</script>

<section
	class={`st-summary ${theme}`}
	class:nomargin
	class:outline
	on:click={() => {
		returnOnClick();
	}}
>
	<details {open} bind:this={ele}>
		<summary class={titleTheme}>
			<span class={titleSize}>
				<slot name="title" />
				{title}
			</span>
		</summary>
		<p class={`content ${contentSize} ${contentTheme}`}>
			<slot />
			{content}
		</p>
	</details>
</section>

<style lang="scss">
	.st-summary {
		padding: 10px;
		margin: 0;
		margin-bottom: 10px;

		&.outline.dark {
			border: 1px dotted white;
		}

		&.outline.light {
			border: 1px dotted black;
		}

		&.nomargin {
			margin-bottom: 0;
		}

		.content {
			margin: 0;
			padding: 10px 0 0 0;

			$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
			@each $theme in $themes {
				&.#{$theme} {
					color: var(--#{$theme}-0);
				}
			}

			&.small {
				font-size: var(--st-small-font) !important;
			}

			&.normal {
				font-size: var(--st-medium-font) !important;
			}

			&.large {
				font-size: var(--st-large-font) !important;
			}
		}

		details {
			width: 100%;
		}

		summary {
			font-weight: bold;
			cursor: pointer;

			$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
			@each $theme in $themes {
				&.#{$theme} {
					color: var(--#{$theme}-0);
				}
			}

			span {
				&.small {
					font-size: var(--st-small-font) !important;
				}

				&.normal {
					font-size: var(--st-medium-font) !important;
				}

				&.large {
					font-size: var(--st-large-font) !important;
				}
			}
		}
	}
</style>
