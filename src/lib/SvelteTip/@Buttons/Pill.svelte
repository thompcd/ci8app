<script lang="ts">
	export let inactiveTheme = 'light';
	export let activeTheme = 'default';
	export let tiny = false;
	export let rounded = false;
	export let disabled = false;
	export let active = false;
	export let exactfit = false;
	export let size = 'normal';
	export let onClick = null;
</script>

<button
	class={`pill ${activeTheme} ${inactiveTheme}-theme-inactive ${size}`}
	class:exactfit
	class:tiny
	class:rounded
	class:disabled
	class:active
	on:click={() => {
		onClick && onClick();
	}}
>
  <span>
	  <slot />
  </span>
</button>

<style lang="scss">
	.pill {
		flex: 1 1 auto;
		background: var(--white-1);
		border: 2px solid var(--white-2);
		color: var(--white-1-text);
		cursor: pointer;
		font-size: 10px;
		overflow: hidden;
		opacity: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
		max-width: 50%;
		margin: 2px;
    font-weight: 600;

		&:active {
			background: var(--white-4);
		}

		&.tiny {
			font-size: 9px;
			height: 25px;
		}

		&.small {
			font-size: 10px;
			height: 30px;
		}

		&.medium {
			font-size: 12px;
			height: 35px;
		}

		&.large {
			font-size: 14px;
			height: 40px;
		}

		&.exactfit {
			flex: none;
			width: auto !important;
			max-width: auto !important;
		}

		&.disabled {
			opacity: 0.5;
		}

		&.tiny {
			font-size: 8px;
		}

		&.rounded {
			border-radius: 5px;
		}

		&.light-theme-inactive {
			background: var(--white-5);
			color: var(--white-5-text);
			border: 2px solid var(--white-5);
		}

		&.dark-theme-inactive {
			background: var(--black-2);
			color: var(--black-2-text);
			border: 2px solid var(--black-2);
		}

		$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger', 'black', 'white';
		@each $theme in $themes {
			&.#{$theme} {
				&.active {
					background: var(--#{$theme}-1) !important;
					border: 2px solid var(--#{$theme}-1) !important;
					color: var(--#{$theme}-1-text) !important;
				}

				&:active {
					background: var(--#{$theme}-2) !important;
				}
			}
		}
	}
</style>
