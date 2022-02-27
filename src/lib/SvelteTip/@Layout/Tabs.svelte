<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	import SVG from '@text/SVG.svelte';
	import Button from '@button/Button.svelte';

	export let queryId = 'id';
	export let defaultTab = null;
	export let closable = false;
	export let tabs = [];
	export let applyTheme = 'black';
	export let onClick = null;
	export let onClose = null;

	const theme: string = getContext('theme');
	const colors: any = getContext('colors');

	$: svgFill = (_theme) => {
		return browser ? colors[_theme][0].textFriendlyColor : 'black';
	};

	$: isActive = (id) => {
		const query = $page?.query.get(queryId);
		return query === null ? defaultTab === id : query === id;
	};
</script>

<div class={`tabs ${theme}-theme`}>
	<div class="links">
		{#each tabs as tab, index}
			<Button
				nomargin
				exactfit
				rel="external"
				applyTheme={isActive(tab.id) ? applyTheme : theme === 'dark' ? 'black' : 'white'}
				href={`?${queryId}=${tab.id}`}
				onClick={() => {
					onClick && onClick({ tab, index });
				}}
			>
				{tab.title}
			</Button>

			{#if closable}
				<Button
					nomargin
					exactfit
					applyTheme={isActive(tab.id) ? applyTheme : theme === 'dark' ? 'black' : 'white'}
					onClick={() => {
						onClose && onClose({ tab, index });
					}}
				>
					<SVG
						icon="cross"
						size={10}
						fill={svgFill(isActive(tab.id) ? applyTheme : theme === 'dark' ? 'black' : 'white')}
					/>
				</Button>
			{/if}
		{/each}
	</div>

	{#each tabs as { component, props, id }, index}
		<div class="content" class:active={isActive(id)}>
			<svelte:component this={component} {...props} />
		</div>
	{/each}
</div>

<style lang="scss">
	.tabs {
		width: 100%;
	}

	.links {
		width: 100%;
		display: flex;
	}

	.content {
		display: none;
		&.active {
			display: block;
		}
	}
</style>
