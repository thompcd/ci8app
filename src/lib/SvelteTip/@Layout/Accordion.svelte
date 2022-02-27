<script lang="ts">
	import Panel from '@panel/Panel.svelte';
	import SVG from '@text/SVG.svelte';
	import HTag from '@text/HTag.svelte';

	export let applyTheme = 'default';
	export let nomargin = false;

	export let rounded = false;
	export let shadow = false;
	export let shadowOnHover = false;
	export let skinnybar = false;
	export let onlyOneOpened = false;
	export let headerTag = 'h2';
	export let dataset = [];

	export let onClick = null;

	const onHeaderClick = (index) => {
		onClick && onClick({ index });
		set = set.map((x, i) => {
			x.open = index === i ? !x.open : onlyOneOpened ? false : x.open;
			return x;
		});
	};

	$: set = dataset.map((x) => x);
</script>

<div class="accordion" class:rounded={rounded && nomargin}>
	{#each set as {title = '', contentHeight = 'auto', open = false, icon = null, content = '', component = null, props = {}}, index}
		<Panel
			{open}
			{applyTheme}
			{shadow}
			{shadowOnHover}
			{nomargin}
			{skinnybar}
			{contentHeight}
			rounded={rounded && !nomargin}
			onHeaderClick={() => {
				onHeaderClick(index);
			}}
		>
			<div slot="title">
				<HTag {headerTag}>
					{title}
				</HTag>
			</div>

			<div slot="action">
				<SVG icon={!!icon ? icon : open ? 'minus' : 'plus'} />
			</div>

			<div slot="content">
				<slot />
				{content}
				{#if !!component}
					<svelte:component this={component} {...props} />
				{/if}
			</div>
		</Panel>
	{/each}
</div>

<style lang="scss" scoped>
	.accordion {
		width: 100%;
		overflow: hidden;
		font-family: var(--font-one);

		&.rounded {
			border-radius: 10px;
		}
	}
</style>
