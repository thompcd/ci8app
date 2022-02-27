<script lang="ts">
	import { getContext } from 'svelte';
	import { browser } from '$app/env';
	import { DeviceStore } from '@st-stores/index';

	import Link from '@link/Link.svelte';
	import SVG from '@text/SVG.svelte';

	export let style = null;
	export let text = null;
	export let href = null;
	export let dataTestid = null;

	export let role = 'button';
	export let type = 'button';
	export let applyTheme = 'default';
	export let size = 'medium';
	export let rel = 'external';

	export let useGradiant = false;
	export let disabled = false;
	export let rounded = false;
	export let hollow = false;
	export let target = null;
	export let exactfit = false;
	export let fullOnMobile = false;
	export let nomargin = false;
	export let useToggle = false;
	export let toggled = false;
	export let full = false;
	export let nobg = false;

	export let onClick = null;
	export let prefetch = null;

	const { isMobile } = DeviceStore;
	const theme: string = getContext('theme');
	const colors: any = getContext('colors');

	$: iconSize = () => {
		switch (size) {
			case 'tiny':
				return 9;
			case 'small':
				return 10;
			case 'medium':
				return 12;
			case 'large':
				return 14;
		}
	};

	$: useType = applyTheme === 'default' ? (theme === 'dark' ? 'black' : 'white') : applyTheme;
</script>

{#if !!href}
	<Link inherit {prefetch} {href} {target} style={full ? 'width: 100%' : null}>
		<button
			class={`button ${useType}${useGradiant ? '-gradiant' : ''} ${size} ${theme}-theme`}
			class:nobg
			class:fullOnMobile={fullOnMobile && $isMobile}
			class:nomargin
			class:exactfit
			class:disabled
			class:hollow
			class:rounded
			data-testid={dataTestid}
			{rel}
			{role}
			{type}
			{disabled}
			{style}
			on:click={onClick && !disabled && onClick()}
		>
			<span class="inner">
				<slot>{text || 'Button'}</slot>
				{#if useToggle}
					<SVG
						icon={toggled ? 'checkbox-checked' : 'checkbox-unchecked'}
						fill={browser ? (toggled ? colors.success[0].color : colors.danger[0].color) : null}
						size={iconSize()}
					/>
				{/if}
			</span>
		</button>
	</Link>
{:else}
	<button
		class={`button ${useType}${useGradiant ? '-gradiant' : ''} ${size} ${theme}-theme`}
		class:nobg
		class:fullOnMobile={fullOnMobile && $isMobile}
		class:nomargin
		class:exactfit
		class:disabled
		class:hollow
		class:rounded
		data-testid={dataTestid}
		{role}
		{type}
		{disabled}
		{style}
		on:click={onClick && !disabled && onClick()}
	>
		<span class="inner">
			<slot>{text || 'Button'}</slot>
			{#if useToggle}
				<SVG
					icon={toggled ? 'checkbox-checked' : 'checkbox-unchecked'}
					fill={browser ? (toggled ? colors.success[0].color : colors.danger[0].color) : null}
					size={iconSize()}
				/>
			{/if}
		</span>
	</button>
{/if}

<style lang="scss" scoped>
	button {
		outline: none;
		border: none;
		width: 100%;
		cursor: pointer;
		font-weight: 600;
		padding: 0px 10px 2px 10px;
		margin: 2px;
		white-space: nowrap;

		.inner {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			transform: translateY(1px);
		}

		&.nobg {
			background: none !important;
			outline: none !important;
			border: none !important;
		}

		&.nomargin {
			margin: 0;
		}

		&.exactfit {
			width: auto !important;
		}

		&.fullOnMobile {
			width: 100% !important;
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
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

		&.rounded {
			border-radius: 50px;
		}

		&.hollow {
			background: none !important;
			color: var(--black-1);
		}

		&:active {
			background: var(--black-3);
		}

		&.none {
			border: 3px solid transparent !important;
			background: none !important;
			color: inherit !important;
		}

		&.white {
			border: 3px solid var(--white-6);
			background: var(--white-6);
			color: var(--white-6-text);

			&-gradiant {
				color: var(--white-3-text);
				background: linear-gradient(var(--white-1), var(--white-6));
			}

			&.hollow {
				background: none !important;
				color: var(--black-1);
				&:active {
					color: var(--white-4) !important;
					border: 3px solid var(--white-4);
				}
			}

			&:active {
				color: var(--white-4);
				border: 3px solid var(--white-4);
			}

			&.dark-theme {
				border: 3px solid var(--white-3);
				background: var(--white-3);
				color: var(--white-3-text);

				&.hollow {
					color: var(--white-1) !important;
				}

				&:active {
					background: var(--white-6);
				}
			}
		}

		&.black {
			border: 3px solid var(--black-1);
			background: var(--black-1);
			color: var(--black-1-text);

			&-gradiant {
				color: var(--black-3-text);
				background: linear-gradient(var(--black-1), var(--black-0));
			}

			&.hollow {
				border: 3px solid var(--black-0);
				background: none !important;
				color: var(--black-1) !important;
				&:active {
					color: var(--black-4);
					border: 3px solid var(--black-4);
				}
			}

			&:active {
				color: var(--black-4);
				border: 3px solid var(--black-4);
			}

			&.dark-theme {
				border: 3px solid var(--black-2);
				background: var(--black-2);
				color: var(--black-2-text);

				&:active {
					background: var(--black-6);
				}
			}
		}

		$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
		@each $theme in $themes {
			&.#{$theme} {
				border: 3px solid var(--#{$theme}-1);
				background: var(--#{$theme}-1);
				color: var(--#{$theme}-1-text);

				&-gradiant {
					background: linear-gradient(var(--#{$theme}-1), var(--#{$theme}-3));
					color: var(--#{$theme}-3-text);
				}

				&.hollow {
					background: none !important;
					color: var(--#{$theme}-1) !important;
					border: 3px solid var(--#{$theme}-1) !important;
					&:active {
						color: var(--#{$theme}-4) !important;
						border: 3px solid var(--#{$theme}-4) !important;
					}
				}

				&:active {
					color: var(--#{$theme}-4);
					border: 3px solid var(--#{$theme}-4);
				}
			}
		}
	}
</style>
