<script lang="ts">
	import { getContext } from 'svelte';

	import GlassPanel from '@panel/GlassPanel.svelte';
	import ScrollWrapper from '@layout/ScrollWrapper.svelte';

	export let onClick = null;
	export let target = null;
	export let href: string | null = null;
	export let classes = '';
	export let style = '';
	export let rel = null;
	export let nomargin = false;
	export let rounded = false;
	export let shadow = false;
	export let disabled = false;
	export let hidedivider = false;

	export let prefetch = false;

	const theme: string = getContext('theme');

	let eleWidth = null;

	$: cardSize = () => {
		if (eleWidth >= 720) {
			return 'large';
		}
		if (eleWidth < 720 && eleWidth > 640) {
			return 'medium';
		}
		if (eleWidth < 640 && eleWidth > 420) {
			return 'small';
		}
		if (eleWidth < 420) {
			return 'tiny';
		}
	};

	$: props = !disabled
		? {
				target,
				href,
				rel
		  }
		: {
				href: null
		  };
</script>

{#if prefetch}
	<a
		sveltekit:prefetch
		{...props}
		on:click={() => {
			onClick && !disabled && onClick();
		}}
	>
		<div
			class:nomargin
			class:rounded
			class:shadow
			class:disabled
			class={`article-link ${cardSize()} ${classes}`}
			{style}
			bind:clientWidth={eleWidth}
		>
			<GlassPanel fill noheader open blur={7}>
				<div slot="content" class="inner">
					<div class="image" class:hidedivider>
						<slot name="image" />
					</div>
					<div class="content">
						<div class="title">
							<slot name="title" />
						</div>
						<div class="preview">
							<ScrollWrapper height="50px" skinnybar>
								<slot name="content" />
							</ScrollWrapper>
						</div>
					</div>
				</div>
			</GlassPanel>
		</div>
	</a>
{:else}
	<a
		sveltekit:prefetch
		{...props}
		on:click={() => {
			onClick && !disabled && onClick();
		}}
	>
		<div
			class:nomargin
			class:rounded
			class:shadow
			class:disabled
			class={`article-link ${cardSize()} ${classes}`}
			{style}
			bind:clientWidth={eleWidth}
		>
			<GlassPanel fill noheader open blur={7}>
				<div slot="content" class="inner">
					<div class="image" class:hidedivider>
						<slot name="image" />
					</div>
					<div class="content">
						<div class="title">
							<slot name="title" />
						</div>
						<div class="preview">
							<ScrollWrapper height="50px" skinnybar>
								<slot name="content" />
							</ScrollWrapper>
						</div>
					</div>
				</div>
			</GlassPanel>
		</div>
	</a>
{/if}

<style lang="scss" scoped>
	.article-link {
		width: 100%;
		height: 150px;
		cursor: pointer;
		margin-bottom: 10px;

		&.nomargin {
			margin: 0;
		}

		&.rounded {
			border-radius: 10px;
			overflow: hidden;
		}

		&.shadow {
			box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&:hover {
			.title {
				cursor: pointer;
				color: var(--primary-1);
			}
		}
	}

	.inner {
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 10px;
		overflow: hidden;

		.image {
			width: 100px;
			height: 100%;
			border-right: 1px solid var(--black-2);
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;

			&.hidedivider {
				border-right: none;
			}
		}

		.content {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.preview {
			height: 50px;
		}
	}
</style>
