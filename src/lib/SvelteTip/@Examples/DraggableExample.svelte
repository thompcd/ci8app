<script lang="ts">
	import Draggable from '@utility/Draggable.svelte';
	import Droppable from '@utility/Droppable.svelte';
	import Button from '@button/Button.svelte';

	let dz1 = [];
	let dz2 = [];
	let dz3 = [
		{ title: 'Apples' },
		{ title: 'Peaches' },
		{ title: 'Pears' },
		{ title: 'Cats' },
		{ title: 'Dogs' },
		{ title: 'Birds' }
	];

	const onDragEnd = ({ success, targets, index, listRef }) => {
		if (success) {
			const item = eval(listRef).filter((_x, i) => index === i);
			// add to new list
			targets.forEach((ele) => {
				if (ele.id === 'dropzone1') {
					dz1 = [...dz1, ...item];
				}
				if (ele.id === 'dropzone2') {
					dz2 = [...dz2, ...item];
				}
				if (ele.id === 'dropzone3') {
					dz3 = [...dz3, ...item];
				}
			});

			// remove
			const list = eval(listRef).filter((_x, i) => i !== index);
			if (listRef === 'dz1') {
				dz1 = [...list];
			}
			if (listRef === 'dz2') {
				dz2 = [...list];
			}
			if (listRef === 'dz3') {
				dz3 = [...list];
			}
		}
	};
</script>

<div class="draggable-example">
	<div class="columns">
		<Droppable id="dropzone1">
			<div class="column">
				{#each dz1 as item, index}
					<Draggable {onDragEnd} {index} listRef="dz1">
						<Button applyTheme="primary">{item.title}</Button>
					</Draggable>
				{/each}
			</div>
		</Droppable>

		<Droppable id="dropzone2">
			<div class="column">
				{#each dz2 as item, index}
					<Draggable {onDragEnd} {index} listRef="dz2">
						<Button applyTheme="magic">{item.title}</Button>
					</Draggable>
				{/each}
			</div>
		</Droppable>
	</div>

	<Droppable id="dropzone3">
		<div class="list">
			{#each dz3 as item, index}
				<Draggable {onDragEnd} {index} listRef="dz3">
					<Button>{item.title}</Button>
				</Draggable>
			{/each}
		</div>
	</Droppable>
</div>

<style lang="scss">
	.draggable-example {
		width: 100%;
		height: 350px;
	}

	.columns {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
	}

	.column {
		width: 100%;
		height: 250px;
	}

	.list {
		width: calc(100% - 20px);
		height: calc(100px - 20px);
		padding: 10px;
		display: flex;
		gap: 10px;
	}
</style>
