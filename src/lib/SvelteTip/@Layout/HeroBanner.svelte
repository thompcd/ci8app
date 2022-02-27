<script lang="ts">
	import { getContext } from 'svelte';
	import { DeviceStore } from '@st-stores/index';

	import Button from '@button/Button.svelte';

	export let title = 'Hero Banner Title';
	export let buttonOne = null;
	export let buttonTwo = null;

	export let onTitleClick = null;

	const { isTabletAndBelow, isTablet, isDesktop } = DeviceStore;

	const theme: string = getContext('theme');
</script>

<div class={`hero-banner ${theme}-theme`} class:desktop={$isDesktop}>
	<h1
		class="title"
		class:tablet={$isTablet}
		class:desktop={$isDesktop}
		class:pointer={!!onTitleClick}
		on:click={() => {
			onTitleClick && onTitleClick();
		}}
	>
		{title}
	</h1>
	<div class="buttons">
		{#if buttonOne}
			<Button
				style={'min-width: 100px'}
				size={$isTabletAndBelow ? 'tiny' : 'medium'}
				{...buttonOne}
			/>
		{/if}
		{#if buttonTwo}
			<Button
				style={'min-width: 100px'}
				size={$isTabletAndBelow ? 'tiny' : 'medium'}
				{...buttonTwo}
			/>
		{/if}
	</div>
</div>

<style lang="scss">
	.hero-banner {
		width: 100%;
		padding: 10px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: transparent;
		color: var(--white-0-text);

		&.desktop {
			padding: 50px 0;
		}

		// &.lowHeight {
		// 	padding: 10px 0 !important;
		// }

		&.dark-theme {
			color: var(--black-0-text);
		}

		.title {
			font-size: 32px;
			margin-bottom: 5px;
			&.pointer {
				cursor: pointer;
			}
			&.tablet {
				font-size: 54px !important;
			}
			&.desktop {
				font-size: 72px !important;
			}
			// &.lowHeight {
			// 	font-size: 32px !important;
			// }
		}

		.buttons {
			display: flex;
			gap: 10px;
		}
	}
</style>
