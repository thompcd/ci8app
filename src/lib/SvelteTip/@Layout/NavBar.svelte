<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { DeviceStore } from '@st-stores/index';

	import Link from '@link/Link.svelte';
	import SVG from '@text/SVG.svelte';

	export let links = [];
	export let prefetch = false;
	const { isTabletAndAbove } = DeviceStore;
	const theme: string = getContext('theme');

	$: checkActive = ({ href, hrefIncludes, queryIncludes }) => {
		if (!!queryIncludes?.id) {
			const { id, queryId } = queryIncludes;
			return $page.query.get(id) === queryId;
		} else {
			return $page.path === href || (hrefIncludes && $page.path.includes(hrefIncludes));
		}
	};
</script>

<div class={`nav-bar ${theme}-theme`} class:tabletAndAbove={$isTabletAndAbove}>
	<div class="links">
		{#each links as {title, href = '/', hrefIncludes = null, queryIncludes = {id: null, queryId: null}}}
			<Link
				{prefetch}
				{href}
				active={checkActive({ href, hrefIncludes, queryIncludes })}
				inherit
				underline
			>
				{title}
			</Link>
		{/each}
	</div>

	<div class="icons">
		{#each links as {icon = 'home',  href = '/', hrefIncludes, queryIncludes}}
			<Link
				{prefetch}
				{href}
				active={checkActive({ href, hrefIncludes, queryIncludes })}
				inherit
				underline
			>
				<SVG {icon} style="padding-bottom: 4px;" />
			</Link>
		{/each}
	</div>
</div>

<style lang="scss">
	.nav-bar {
		.links {
			display: none;
		}
		.icons {
			display: flex;
			gap: 15px;
			transform: translateY(5px);
		}

		&.tabletAndAbove {
			.links {
				display: flex;
				gap: 10px;
				font-weight: 700;
				color: var(--white-0-text);
				transform: translateY(3px);
				font-size: 12px;
			}

			.icons {
				display: none;
			}
		}

		&.dark-theme {
			.links {
				color: var(--black-0-text);
			}
		}
	}
</style>
