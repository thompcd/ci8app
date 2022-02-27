<script lang="ts">
	import { getContext } from 'svelte';
	import { DeviceStore } from '@st-stores/index';

	export let size: number = 150;
	export let gap: number = 10;
	export let exactfit: boolean = true;

	export let outline: boolean = false;
	export let items: any = [];
	export let onClick = null;

	const { isDesktop } = DeviceStore;
	const theme: string = getContext('theme');

	$: style = () => {
		return `grid-auto-rows: ${size}px; grid-template-columns: repeat(auto-fill, minmax(${size}px, 1fr)); grid-gap: ${gap}px`;
	};
</script>

<ul class="grid-layout" style={style()}>
	{#each items as { component, row, column, props }, index}
		<li
			class:desktop={$isDesktop}
			class={`grid-item ${theme}-theme`}
			class:clickable={!!onClick}
			class:exactfit
			class:row-two={row && row === 2}
			class:row-three={row && row === 3}
			class:column-two={column && column === 2}
			class:column-three={column && column === 3}
			class:outline
			on:click={() => {
				onClick && onClick(index);
			}}
		>
			<svelte:component this={component} {...props} />
		</li>
	{/each}
</ul>

<style lang="scss">
	.grid-layout {
		padding: 0;
		margin: 0;
		// Flexbox Default/Fallback - does not produce 100% matching result
		display: flex;
		flex-wrap: wrap;
		// Use Grid if browser supports it
		display: grid;
	}

	.grid-item {
		flex: 0 0 auto;
		flex-wrap: wrap;
		height: 20vh;
		margin: 0.12rem;
		width: 20rem;
		min-width: 15rem;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border: 2px solid none;

		&.clickable {
			cursor: pointer;
		}

		&.outline {
			border: 2px solid var(--black-1);
		}

		&.dark-theme {
			&.outline {
				border: 2px solid var(--white-0);
			}
		}

		@supports (display: grid) {
			//unset the propertied used for flexbox fallback
			height: initial;
			margin: unset;
			width: initial;
			min-width: initial;

			&.desktop {
				&.column-two {
					grid-column: span 2;
				}

				&.column-three {
					grid-column: span 2;
				}
			}

			&.row-two {
				grid-row: span 2;
			}

			&.row-three {
				grid-row: span 2;
			}
		}
	}
</style>
