<script lang="ts">
	import { onDestroy, getContext } from 'svelte';

	export let id = 'quillInstance';
	export let preview = false;
	export let placeholder = null;
	export let toggledButtons = false;
	export let blockQuote = false;
	export let codeBlock = false;
	export let headerButtons = false;
	export let listOptions = false;
	export let superSubScript = false;
	export let image = false;
	export let video = false;
	export let direction = false;
	export let size = false;
	export let header = false;
	export let clean = false;
	export let autogrow = false;
	export let autogrowHeight = '200px';

	export let onInit = null;
	export let onChange = null;

	const theme: any = getContext('theme');
	const defaultSrc = 'https://cdn.quilljs.com/1.3.6/quill.js';
	const defaultLink = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

	let quillEle = null;
	let hasError = false;
	let isLoading = true;
	let isReinit = false;

	let quill = null;
	let quillOutput = null;

	const onTextChange = () => {
		quillOutput = quill.root.innerHTML;
		onChange && onChange(quillOutput);
	};

	const onScriptLoad = () => {
		let toolbarOptions = [];

		const barOne = [
			size ? { size: ['small', false, 'large', 'huge'] } : null,
			header ? { header: [1, 2, 3, 4, 5, 6, false] } : null
		];

		const barTwo = [
			toggledButtons ? 'bold' : null,
			toggledButtons ? 'italic' : null,
			toggledButtons ? 'underline' : null,
			toggledButtons ? 'strike' : null,
			blockQuote ? 'blockquote' : null,
			codeBlock ? 'code-block' : null,
			image ? 'image' : null,
			video ? 'video' : null,
			clean ? 'clean' : null,
			superSubScript ? { script: 'sub' } : null,
			superSubScript ? { script: 'super' } : null,
			listOptions ? { list: 'ordered' } : null,
			listOptions ? { list: 'bullet' } : null
		];

		const barThree = [
			headerButtons ? { header: 1 } : null,
			headerButtons ? { header: 2 } : null,
			direction ? { direction: 'rtl' } : null
		];

		toolbarOptions = toggledButtons
			? [
					...toolbarOptions,
					barOne.filter((x) => x !== null),
					barTwo.filter((x) => x !== null),
					barThree.filter((x) => x !== null)
			  ]
			: [...toolbarOptions];

		const options = {
			placeholder,
			modules: {
				toolbar: toolbarOptions.length > 0 ? toolbarOptions : false
			},
			theme: 'snow'
		};

		try {
			// initalize
			/* @ts-ignore */
			quill = new Quill(`#${id}`, {
				...options
			});

			onInit && onInit({ success: true });

			// gets initial output
			quillOutput = quill.root.innerHTML;

			// on text-change
			quill.on('text-change', onTextChange);
			onTextChange();
		} catch {
			onInit && onInit({ success: false });
		}

		isLoading = false;
	};

	onDestroy(() => {
		quillEle.remove();
		quill.off('text-change', onTextChange);
	});

	$: style = `height: ${autogrowHeight} !important; overflow-y: auto !important;`;
</script>

<svelte:head>
	<link href={defaultLink} rel="stylesheet" />
	<script src={defaultSrc} on:load={onScriptLoad} />
</svelte:head>

<div class={`quill-wrapper ${theme}-theme`} bind:this={quillEle}>
	<div class="quill-instance" {id} {style}>
		<slot />
	</div>
</div>

{#if preview}
	<div class={`quill-preview ${theme}-theme`}>
		<class class="title">Output:</class>
		{@html quillOutput}
	</div>
{/if}

<style lang="scss">
	.quill-wrapper {
		width: 100%;
		height: 100%;
		border: none;

		.quill-instance {
			width: 100%;
			height: 100%;
		}

		&.light-theme {
			:global(.ql-stroke) {
				stroke: var(--white-0);
			}
			:global(.ql-fill) {
				fill: var(--white-0);
			}
			:global(.ql-picker-label) {
				color: var(--white-0);
			}
			:global(.ql-container) {
				border: none;
			}
			:global(.ql-toolbar) {
				background: var(--black-2);
			}
			:global(.ql-editor) {
				background: var(--white-3);
				color: var(--white-3-text);
			}
		}

		&.dark-theme {
			:global(.ql-stroke) {
				stroke: var(--black-2);
			}
			:global(.ql-fill) {
				fill: var(--black-2);
			}
			:global(.ql-picker-label) {
				color: var(--black-2);
			}
			:global(.ql-container) {
				border: none;
			}
			:global(.ql-toolbar) {
				background: var(--white-2);
				color: var(--white-2-text);
			}
			:global(.ql-editor) {
				background: var(--black-1);
				color: var(--black-1-text);
			}
		}
	}

	.quill-preview {
		width: calc(100% - 20px);
		height: auto;
		padding: 10px;
		margin-top: 10px;
		position: relative;

		.title {
			position: absolute;
			padding: 5px 10px;
			top: 0;
			right: 0;
			background: var(--black-2);
			color: var(--black-2-text);
			border-radius: 0 0 0 10px;
		}

		&.light-theme {
			outline: 1px dotted var(--black-2);
		}

		&.dark-theme {
			outline: 1px dotted var(--white-2);
		}
	}
</style>
