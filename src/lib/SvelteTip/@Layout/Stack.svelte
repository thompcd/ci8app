<script>
	export let outline = false;
	export let nogap = false;
	export let stack = false;

	export let leftWidth = null;
	export let rightWidth = null;

	$: leftStyle = !!leftWidth
		? !stack
			? `min-width: 100%; max-width: 100%`
			: `min-width: ${leftWidth}; max-width: ${leftWidth}`
		: null;

	$: rightStyle = !!rightWidth
		? !stack
			? `min-width: 100%; max-width: 100%`
			: `min-width: ${rightWidth}; max-width: ${rightWidth}`
		: null;
</script>

<div class="stacks" class:nogap class:stackit={stack}>
	<div class="stack stack--left" class:outline style={leftStyle}>
		<slot name="stack-left">
			<h1>Left</h1>
		</slot>
	</div>
	<div class="stack stack--right" class:outline style={rightStyle}>
		<slot name="stack-right">
			<h1>Right</h1>
		</slot>
	</div>
</div>

<style lang="scss">
	.stacks {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		column-gap: 10px;

		&.nogap {
			gap: 0;
		}

		&.stackit {
			flex-direction: row;
		}
	}

	.stack {
		overflow: hidden;
		width: 100%;

		&.outline {
			outline: 1px solid red;
		}
	}
</style>
