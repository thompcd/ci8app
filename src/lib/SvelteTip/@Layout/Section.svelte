<script>
	import { DeviceStore } from '@st-stores/index';

	export let className = null;
	export let style = null;

	export let nomargin = false;
	export let nopadding = false;
	export let outline = false;

	const { isDesktop } = DeviceStore;
</script>

<div
	class={`section ${!!className ? className : ''}`}
	class:desktop={$isDesktop}
	class:nopadding
	class:nomargin
	class:outline
	{style}
>
	<slot />
</div>

<style lang="scss">
	.section {
		width: calc(100% - 20px);
		padding: 0 10px;
		margin-bottom: 10px;

		&.nopadding {
			width: 100%;
			padding: 0;
		}

		&.nomargin {
			margin: 0;
		}

		&.outline {
			border: 3px dotted var(--black-1);
		}

		&.desktop {
			width: calc(100% - 40px);
			height: calc(100% - 40px);
			padding: 20px;
		}
	}
</style>
