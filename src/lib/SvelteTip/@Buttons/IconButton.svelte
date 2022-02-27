<script lang="ts">
	import { getContext } from 'svelte';

	import Button from '@button/Button.svelte';
	import SVG from '@text/SVG.svelte';
	import Link from '@link/Link.svelte';

	export let style = null;
	export let text = null;
	export let href = null;

	export let role = 'button';
	export let type = 'button';
	export let applyTheme = 'default';
	export let size = 'medium';
	export let rel = 'external';

	export let useGradiant = false;
	export let rounded = false;
	export let hollow = false;
	export let disabled = false;
	export let nomargin = false;
	export let exactfit = false;
	export let fullOnMobile = false;
	export let icon = null;
	export let iconLocation = 'right';

	export let target = null;
	export let prefetch = null;
	export let onClick = null;

	const theme: string = getContext('theme');
	const colors = getContext('colors');

	$: props = {
		role,
		type,
		rel,
		applyTheme,
		useGradiant,
		disabled,
		rounded,
		hollow,
		target,
		exactfit,
		fullOnMobile,
		nomargin,
		style,
		onClick
	};

	$: iconSize = () => {
		switch (size) {
			case 'tiny':
				return 12;
			case 'small':
				return 14;
			case 'medium':
				return 16;
			case 'large':
				return 18;
		}
	};

	$: useType = applyTheme === 'default' ? (theme === 'dark' ? 'black' : 'white') : applyTheme;
	$: fill = !!useType ? colors[useType][0].textFriendlyColor : theme === 'dark' ? 'black' : 'white';
</script>

{#if !!href}
	<Link inherit {prefetch} {href} {target}>
		<Button {...props}>
			{#if iconLocation === 'left'}
				<SVG {icon} {fill} size={iconSize()} />
			{/if}
			<slot>{text || 'Button'}</slot>
			{#if iconLocation === 'right'}
				<SVG {icon} {fill} size={iconSize()} />
			{/if}
		</Button>
	</Link>
{:else}
	<Button {...props}>
		{#if iconLocation === 'left'}
			<SVG {icon} {fill} size={iconSize()} />
		{/if}
		<slot>{text || 'Button'}</slot>
		{#if iconLocation === 'right'}
			<SVG {icon} {fill} size={iconSize()} />
		{/if}
	</Button>
{/if}
