<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { SiteStore } from '@st-stores/index';
	import { debounce } from '@st-js/index';
	import { browser } from '$app/env';

	export let height = '100vh';
	export let adjustPx = 0;
	export let accountForTopPos = false;
	export let skinnybar = false;
	export let centered = false;
	export let onScroll = null;

	let ele;
	let topPos = 0;
	let yPos = 0;

	const theme: string = getContext('theme');
	const { innerContainerAdditionalHeight } = SiteStore;

	const resizeEvent = debounce(
		() => {
			topPos = ele?.getBoundingClientRect().top || 0;
		},
		100,
		null
	);

	// watches for changes in offsetHeight
	SiteStore.openNotch.subscribe(async () => {
		setTimeout(() => {
			resizeEvent();
		});
	});

	onMount(() => {
		setTimeout(() => {
			resizeEvent();
		});
		if (browser) {
			window.addEventListener('resize', resizeEvent);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', resizeEvent);
		}
	});

	$: style = accountForTopPos
		? `height: calc(100vh - ${Math.abs(
				topPos
		  )}px - ${adjustPx}px + ${$innerContainerAdditionalHeight}px)`
		: `height: calc(${height} + ${$innerContainerAdditionalHeight}px - ${
				!!adjustPx ? `${adjustPx}px` : `0px`
		  })`;
</script>

<div
	on:scroll={() => {
		onScroll && onScroll({ val: ele?.scrollTop });
	}}
	class={`inner-container ${theme}-theme`}
	class:centered
	class:skinnybar
	{style}
	bind:this={ele}
>
	<slot />
</div>

<style lang="scss">
	.inner-container {
		overflow-y: auto;

		&.centered {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&.skinnybar {
			&::-webkit-scrollbar {
				width: 2px;
			}
			&::-webkit-scrollbar-track {
				background: var(--white-2);
			}
			&::-webkit-scrollbar-thumb {
				background: var(--white-6);
			}
		}

		&.dark-theme {
			&.skinnybar {
				&::-webkit-scrollbar {
					width: 2px;
				}
				&::-webkit-scrollbar-track {
					background: var(--black-2);
				}
				&::-webkit-scrollbar-thumb {
					background: var(--black-6);
				}
			}
		}
	}
</style>
