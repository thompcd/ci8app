<script lang="ts">
	import { getContext } from 'svelte';
	import Pill from '@button/Pill.svelte';

	const theme: string = getContext('theme');

	const setTheme = (theme) => {
		localStorage.setItem('theme', theme);
		location.reload();
	};
</script>

<div class="themeswitcher" class:dark-theme={theme === 'dark'}>
	<Pill
		tiny
		exactfit
		inactiveTheme="light"
		activeTheme="white"
		disabled={theme === 'light'}
		onClick={() => {
			theme !== 'light' && setTheme('light');
		}}
	>
		LIGHT
	</Pill>

	<Pill
		tiny
		exactfit
		inactiveTheme="dark"
		activeTheme="black"
		disabled={theme === 'dark'}
		onClick={() => {
			theme !== 'dark' && setTheme('dark');
		}}
	>
		DARK
	</Pill>
</div>

<style lang="scss">
	.themeswitcher {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}
</style>
