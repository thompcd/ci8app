<script lang="ts">
	import { getContext } from 'svelte';
	import { copyToClipboard } from '@st-js';

	import Panel from '@panel/Panel.svelte';
	import Button from '@button/Button.svelte';

	export let title = null;
	export let hidetitle = false;
	export let show = false;

	export let snippet: string = `
     const foo = 'foo';
     const bar = 'bar'
  `;

	const theme: string = getContext('theme');
	const addSnack: any = getContext('addSnack');

	const onCopySuccess = () => {
		addSnack({ message: 'Copied!', duration: 2000, applyTheme: 'success' });
	};

	const onCopyFail = () => {
		addSnack({ message: 'Failed to copy to clipboard.', duration: 2000, applyTheme: 'danger' });
	};
</script>

<div class="code-block-container" class:show class:hide={!show}>
	{#if !hidetitle}
		<Panel open nopadding>
			<h5 slot="title">{title}</h5>

			<section slot="content">
				<div class={`code-block ${theme}-theme`}>
					<div class="copy-btn">
						<Button
							applyTheme="success"
							exactfit
							nomargin
							onClick={() => {
								copyToClipboard({ snippet, onCopySuccess, onCopyFail });
							}}>Copy</Button
						>
					</div>

					<div class="inner">
						<code>
							<pre>      
                  {snippet}
                </pre>
						</code>
					</div>
				</div>
			</section>
		</Panel>
	{:else}
		<div class={`code-block ${theme}-theme`}>
			<div class="copy-btn">
				<Button
					applyTheme="success"
					exactfit
					nomargin
					onClick={() => {
						copyToClipboard({ snippet, onCopySuccess, onCopyFail });
					}}>Copy</Button
				>
			</div>

			<div class="inner">
				<code>
					<pre>             
              {snippet}
            </pre>
				</code>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.code-block-container {
		&.show {
			opacity: 1;
			width: auto;
			height: auto;
		}

		&.hide {
			opacity: 0;
			width: 0;
			height: 0;
		}
	}
	.code-block {
		position: relative;
		background: black;
		color: var(--primary-1);
		// margin: 5px 0;

		&.dark-theme {
			color: var(--success-1);
		}

		.inner {
			width: 100%;
			height: 100%;
			overflow-x: auto;
			overflow-y: hidden;
		}
	}

	code,
	pre {
		margin: 0;
		padding: 0;
		color: var(--success-0);
		min-height: 50px;
	}

	.copy-btn {
		position: absolute;
		top: 10px;
		right: 10px;
	}
</style>
