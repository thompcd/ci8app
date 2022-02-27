<script lang="ts">
	import { getContext } from 'svelte';

	export let onClick = null;
	export let type = 'default';
	export let target = null;

	export let href: string | null = null;
	export let classes = '';
	export let style = '';
	export let disabled = false;
	export let text = null;
	export let rel = null;

	export let inherit = false;
	export let active = false;
	export let underline = false;
	export let outline = false;
	export let exactfit = false;
	export let applyHover = false;
	export let applyActive = false;
	export let prefetch = false;

	const theme: string = getContext('theme');

	$: props = !disabled
		? {
				target,
				href,
				style,
				rel
		  }
		: {
				href: null
		  };
</script>

{#if prefetch}
	<a
		sveltekit:prefetch
		class={`link ${theme}-theme ${type} ${classes}`}
		class:disabled
		class:active
		class:outline
		class:underline
		class:exactfit
		class:inherit
		class:applyHover
		class:applyActive
		{...props}
		on:click={() => {
			onClick && !disabled && onClick();
		}}
	>
		<slot>{text || 'Link'}</slot>
	</a>
{:else}
	<a
		class={`link ${theme}-theme ${type} ${classes}`}
		class:disabled
		class:active
		class:outline
		class:underline
		class:exactfit
		class:inherit
		class:applyHover
		class:applyActive
		{...props}
		on:click={() => {
			onClick && !disabled && onClick();
		}}
	>
		<slot>{text || 'Link'}</slot>
	</a>
{/if}

<style lang="scss" scoped>
	.link {
		cursor: pointer;
		text-decoration: none;
		font-weight: 400;

		&.disabled {
			opacity: 0.2;
		}

		&.exactfit {
			width: auto;
		}

		&.outline {
			border: 1px dashed var(--white-0);
		}

		&.active {
			font-weight: 700;
		}

		&.default {
			color: inherit !important;
			&.active {
				color: inherit !important;
				&.underline {
					border-bottom: 2px solid var(--black-1);
				}
			}
			&.applyHover {
				&:hover {
					color: inherit !important;
				}
			}
			&.applyActive {
				&:active {
					color: inherit !important;
				}
			}
		}

		&.light-theme {
			color: var(--black-1);
			&.active {
				color: var(--black-2);
				&.underline {
					border-bottom: 2px solid var(--black-1);
				}
			}
		}

		&.dark-theme {
			color: var(--white-0);

			&.active {
				color: var(--white-2);
				&.underline {
					border-bottom: 2px solid var(--white-0);
				}
			}
		}

		&.applyHover {
			&:hover {
				color: var(--primary-2) !important;
			}
		}

		&.applyActive {
			&:active {
				color: var(--primary-4) !important;
			}
		}

		$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white';
		@each $theme in $themes {
			&.#{$theme} {
				&.active {
					color: var(--#{$theme}-0);
					&.underline {
						border-bottom: 2px solid var(--#{$theme}-0);
					}
				}
				&.applyHover {
					&:hover {
						color: var(--#{$theme}-2) !important;
					}
				}
				&.applyActive {
					&:active {
						color: var(--#{$theme}-4) !important;
					}
				}
			}
		}

		&.inherit {
			color: inherit !important;
			&.underline {
				border-bottom: 2px solid inherit !important;
			}
		}
	}
</style>
