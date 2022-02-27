<script>
	export let id = null;
</script>

<div class={`droppable`} {id}>
	<slot />
</div>

<style lang="scss">
	.droppable {
		width: 100%;
		height: auto;
		border: 1px dotted rgba(255, 255, 255, 0.2);
	}
</style>
