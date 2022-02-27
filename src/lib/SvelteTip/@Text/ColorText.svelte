<script lang="ts">
	import { getContext } from 'svelte';

	export let applyTheme = 'primary';

	const theme: string = getContext('theme');
</script>

<span class={`color-text ${applyTheme} ${theme}-theme`}>
	<slot />
</span>

<style lang="scss">
	$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
	@each $theme in $themes {
		.color-text {
			&.#{$theme} {
				color: var(--#{$theme}-0);
			}
			.dark-theme {
				&.#{$theme} {
					color: var(--#{$theme}-1);
				}
			}
		}
	}
</style>
