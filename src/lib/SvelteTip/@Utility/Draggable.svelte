<script lang="ts">
	import { onDestroy } from 'svelte';

	let ele;
	let dragging = false;
	let startX;
	let startY;
	let style = '';

	let currentX = null;
	let currentY = null;

	let dropzones = [];

	export let onDragStart = null;
	export let onDragEnd = null;
	export let onUpdate = null;
	export let index = null;
	export let id = null;
	export let listRef = null;

	const mouseMove = (e) => {
		const { clientX, clientY } = e;
		if (dragging) {
			currentX = (startX - clientX) * -1;
			currentY = (startY - clientY) * -1;

			const y = startY + currentY;
			const x = startX + currentX;

			dropzones = dropzones.map((d) => {
				const { ele, x1, x2, y1, y2 } = d;
				if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
					d.active = true;
					ele.classList.add('droppable-active');
				} else {
					d.active = false;
					ele.classList.remove('droppable-active');
				}
				return d;
			});

			if (dropzones.filter((x) => x.active).length > 0) {
				onUpdate &&
					onUpdate(
						dropzones.map(({ active, ele }) => {
							return { active, ele };
						})
					);
			}

			style = `	transition: 0; transform: translateX(${currentX}px) translateY(${currentY}px)`;
		}
	};

	const mouseUp = () => {
		const targets = dropzones.filter((x) => x.active).map((x) => x.ele);

		onDragEnd && onDragEnd({ success: targets.length > 0, targets, ele, index, id, listRef });
		dragging = false;

		/* @ts-ignore */
		const activeDrops = [...document.querySelectorAll('.droppable-active')];
		for (let target of activeDrops) {
			target.classList.remove('droppable-active');
		}

		style = `transition: ${
			targets.length === 0 ? '0.3s' : 0
		}; transform: translateX(0}px) translateY(0}px)`;

		destroyEvent();
	};

	const dragStart = ({ clientX, clientY }) => {
		setup();

		onDragStart && onDragStart({ clientX, clientY });

		startX = Number(clientX);
		startY = Number(clientY);
		dragging = true;

		destroyEvent();

		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);
	};

	const destroyEvent = () => {
		currentX = null;
		currentY = null;
		document.removeEventListener('mousemove', mouseMove);
		document.removeEventListener('mouseup', mouseUp);
	};

	const setup = () => {
		/* @ts-ignore */
		const targets = [...document.querySelectorAll('.droppable')];
		setTimeout(() => {
			dropzones = [];
			for (let target of targets) {
				const { x, y, width, height } = target.getBoundingClientRect();
				dropzones.push({
					x1: Math.floor(x),
					y1: Math.floor(y),
					x2: Math.ceil(x + width),
					y2: Math.ceil(y + height),
					active: false,
					ele: target
				});
			}
		});
	};

	onDestroy(() => {
		destroyEvent();
	});
</script>

<div
	class="draggable"
	class:dragging
	bind:this={ele}
  on:touchmove={(e) => {e.preventDefault()}}
	on:mousedown={dragStart}
	{style}
	{id}
	{listRef}
>
	<slot />
</div>

<style lang="scss">
	.draggable {
		width: 100%;
		height: fit-content;
		overflow: hidden;

		&.dragging {
			cursor: pointer;
			z-index: 999;
			outline: 1px dotted rgba(255, 255, 255, 1);
			opacity: 0.2;
		}
	}

	:global(.droppable-active) {
		opacity: 0.9;
		outline: 1px dotted rgba(255, 255, 255, 1);
	}
</style>
