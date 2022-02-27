<script lang="ts">
	import { getContext } from 'svelte';

	export let applyTheme = 'default';
	export let nopadding = false;
	export let rounded = false;
	export let shadow = false;
	export let shadowOnHover = false;
	export let exactfit = false;
	export let maxHeight = 'auto';
	export let useGradiant = false;

  export let onClick = null;

	const theme: string = getContext('theme');

	let cWidth = null;

	$: useType = applyTheme === 'default' ? (theme === 'dark' ? 'black' : 'white') : applyTheme;
</script>

<div
	class={`box ${useGradiant ? `${useType}-gradiant` : useType}`}
	class:nopadding
	class:rounded
	class:shadow
	class:shadowOnHover
  on:click={() => {onClick && onClick()}}
	bind:clientWidth={cWidth}
	style={!exactfit
		? !!cWidth
			? `height: ${cWidth - 20}px; max-height: ${maxHeight}`
			: null
		: null}
>
	<slot />
</div>

<style lang="scss">
	.box {
		width: calc(100% - 20px);
		height: calc(100% - 20px);
		max-height: auto;
		padding: 10px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&.nopadding {
			width: 100%;
			padding: 0;
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

		$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
		@each $theme in $themes {
			&.#{$theme} {
				background: var(--#{$theme}-4);
				color: var(--#{$theme}-4-text);

				&-gradiant {
					background: linear-gradient(var(--#{$theme}-1), var(--#{$theme}-3));
					color: var(--#{$theme}-3-text);
				}
			}
		}

		&.black {
			background: var(--black-2);
			color: var(--black-2-text);

			&-gradiant {
				background: linear-gradient(var(--black-1), var(--black-3));
				color: var(--black-3-text);
			}
		}

		&.white {
			background: var(--white-3);
			color: var(--white-3-text);

			&-gradiant {
				background: linear-gradient(var(--white-1), var(--white-8));
				color: var(--white-3-text);
			}
		}
	}
</style>
