<script lang="ts">
	import { getContext } from 'svelte';
	import SVG from '@text/SVG.svelte';

	export let onClick = null;
	export let useGradiant = false;
	export let leftIcon = null;
	export let rightIcon = null;
	export let content = null;
	export let rounded = false;
	export let nomargin = false;
	export let applyTheme = null;
	export let size = 'medium';
	export let style = '';

	let ele;

	const theme: string = getContext('theme');
	const colors: any = getContext('colors');

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
	$: fill = !!useType ? colors[useType][4].textFriendlyColor : theme === 'dark' ? 'black' : 'white';
</script>

<button
	class={`channel-button ${useType}${useGradiant ? '-gradiant' : ''} ${size}`}
	class:rounded
	class:nomargin
	{style}
	on:click={() => {
		onClick && onClick();
	}}
	bind:this={ele}
>
	<div class="icon">
		<SVG icon={leftIcon || 'globe'} {fill} size={iconSize()} />
	</div>
	<div class="content" type="button">
		<slot>
			<span>
				{content || 'Button'}
			</span>
		</slot>
	</div>
	<div class="icon">
		<SVG icon={rightIcon || 'arrow-right'} {fill} size={iconSize()} />
	</div>
</button>

<style lang="scss" scoped>
	.channel-button {
		width: calc(100% - 6px);
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		outline: none;
		margin: 2px;
		border: none;
		font-weight: 600;

		&.tiny {
			font-size: 9px;
			height: 25px;
		}

		&.small {
			font-size: 10px;
			height: 30px;
		}

		&.medium {
			font-size: 12px;
			height: 35px;
		}

		&.large {
			font-size: 14px;
			height: 40px;
		}

		&.nomargin {
			margin: 0;
		}

		&.rounded {
			border-radius: 20px;
		}

		$themes: 'primary', 'secondary', 'magic', 'success', 'warning', 'danger';
		@each $theme in $themes {
			&.#{$theme} {
				background: var(--#{$theme}-4);
				color: var(--#{$theme}-4-text);

				&-gradiant {
					background: linear-gradient(var(--#{$theme}-1), var(--#{$theme}-3));
					color: var(--#{$theme}-3-text);
				}

				&:active {
					background: var(--#{$theme}-5);
				}
			}
		}

		&.black {
			background: var(--black-2);
			color: var(--black-2-text);
			&-gradiant {
				color: var(--black-3-text);
				background: linear-gradient(var(--black-1), var(--black-0));
			}
			&:active {
				background: var(--black-5);
			}
		}

		&.white {
			background: var(--white-6);
			color: var(--white-6-text);
			&-gradiant {
				color: var(--white-3-text);
				background: linear-gradient(var(--white-1), var(--white-6));
			}
			&:active {
				background: var(--white-6);
			}
		}
	}

	.icon {
		width: 50px;
	}

	.content {
		width: 100%;
		text-align: left;
	}
</style>
