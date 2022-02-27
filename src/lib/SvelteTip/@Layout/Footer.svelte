<script lang="ts">
	import { getContext } from 'svelte';

	const theme: string = getContext('theme');
</script>

<footer class={`footer ${theme}-theme`}>
	<p>
		<slot />
	</p>
</footer>

<style lang="scss">
	.footer {
		width: calc(100% - 40px);
		padding: 20px;
		display: flex;
		align-content: center;
		justify-content: center;
		background: var(--white-3);
		color: var(--white-3-text);

		&.dark-theme {
			background: var(--black-0);
			color: var(--black-0-text);
		}
	}
</style>
