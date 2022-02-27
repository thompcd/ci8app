<script lang="ts">
	import { getContext } from 'svelte';
	import { SiteStore, DeviceStore } from '@st-stores/index';

	import ThreeSlot from '@layout/ThreeSlot.svelte';
	import Link from '@link/Link.svelte';
	import SVG from '@text/SVG.svelte';
	import ThemeWrapper from '@layout/ThemeWrapper.svelte';

	export let title = null;
	export let logoSrc = null;
	export let bgSrc = null;
	export let logoLink = '/';
	export let version = null;
	export let noanimation = false;

	export let navEle = null;
	export let centerEle = null;
	export let heroEle = null;
	export let footerEle = null;
	export let notchEle = null;

	export let showHero = false;
	export let showFooter = false;
	export let showNotch = false;

	export let hideTitle = false;
	export let hideLogo = false;
	export let hideNav = false;

	export let invertTheme = false;
	export let showBurgerMenuButton = false;
	export let toggled = false;

	export let notchOpenIcon = 'dots';
	export let notchCloseIcon = 'cross';

	const { openSidebar, openNotch, innerContainerAdditionalHeight, shrinkHeader } = SiteStore;
	const { isTabletAndAbove, isTabletAndBelow, isDesktop } = DeviceStore;

	const theme: string = getContext('theme');

	let bottomHeight = null;
	let navheight = null;

	shrinkHeader.subscribe((val) => {
		toggled = val;
	});

	$: {
		(toggled || !toggled) && onBottomToggle();
	}

	const onBottomToggle = () => {
		setTimeout(
			() => {
				$innerContainerAdditionalHeight = toggled ? bottomHeight + 3 : 3;
			},
			toggled ? 0 : 300
		);
	};

	$: useTheme = invertTheme ? (theme === 'dark' ? 'light' : 'dark') : theme;

	$: bottomPos = toggled
		? `margin-top: -${bottomHeight}px; opacity: 0; pointer-events: none; transition: ${'0.3'}s;`
		: `margin-top: 0; opacity: 1; pointer-events: auto; transition: ${'0.3'}s`;

	$: imageStyle = `background: url('${bgSrc}'); center center no-repeat; background-size: cover;`;
</script>

<nav class={`nav-header ${useTheme}-theme`} style={!!bgSrc ? imageStyle : null}>
	<ThemeWrapper invert={invertTheme}>
		<section class="top-section" bind:clientHeight={navheight}>
			<ThreeSlot nopadding>
				<section class="left-section" slot="left">
					{#if showBurgerMenuButton}
						<SVG
							applyTheme={useTheme === 'dark' ? 'white' : 'black'}
							icon={$openSidebar ? 'circleup' : 'circledown'}
							size={18}
							onClick={() => {
								$openSidebar = !$openSidebar;
							}}
						/>
					{/if}

					<Link href={logoLink}>
						<div class="logo-brand-container">
							{#if !!logoSrc && !hideLogo}
								<img class="logo" src={logoSrc} alt="logo" />
							{/if}

							{#if !hideTitle && title && $isTabletAndAbove}
								<div class={`brand ${useTheme}`} class:desktop={$isDesktop}>
									<slot>
										<h1>{title}</h1>
										{#if !!version}
											<span>v{version}</span>
										{/if}
									</slot>
								</div>
							{/if}
						</div>
					</Link>
				</section>

				<section class="center-section" slot="center" style={`height: ${navheight}px`}>
					{#if !!centerEle && !$isTabletAndBelow}
						<svelte:component this={centerEle.component} {...centerEle?.props} />
					{/if}
				</section>

				<section class="right-section" slot="right">
					{#if !!navEle && !hideNav}
						<svelte:component this={navEle.component} {...navEle?.props} />
					{/if}

					{#if !!notchEle}
						<SVG
							applyTheme={useTheme === 'dark' ? 'white' : 'black'}
							icon={$openNotch ? notchCloseIcon : notchOpenIcon}
							onClick={() => {
								$openNotch = !$openNotch;
							}}
							style="transform: translateY(2px)"
						/>
					{/if}
				</section>
			</ThreeSlot>
		</section>

		{#if !!heroEle || !!footerEle || !!notchEle}
			<section
				class="bottom-section"
				class:noanimation
				bind:clientHeight={bottomHeight}
				style={bottomPos}
			>
				{#if !!heroEle}
					<div class="hero" class:expand={showHero}>
						<svelte:component this={heroEle.component} {...heroEle?.props} />
					</div>
				{/if}

				{#if !!footerEle}
					<div class="footer" class:expand={showFooter}>
						<svelte:component this={footerEle.component} {...footerEle?.props} />
					</div>
				{/if}

				{#if !!notchEle}
					<div class="notch" class:show={showNotch && $openNotch}>
						<svelte:component this={notchEle.component} {...notchEle?.props} />
					</div>
				{/if}
			</section>
		{/if}
	</ThemeWrapper>
</nav>

<style lang="scss" scoped>
	nav {
		position: relative;
		width: 100%;
		height: auto;
		padding: 20px 0;
		overflow: hidden;
		box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.25);
		z-index: 1;

		.logo-brand-container {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.logo {
			width: 25px;
			height: 25px;
			border-radius: 50%;
			margin-right: 10px;
		}

		.brand {
			display: flex;
			font-size: 10px;
			color: var(--black-2);

			&.dark {
				color: var(--white-2);
			}

			&.desktop {
				font-size: 12px;
			}
		}
	}

	.top-section {
		z-index: 2;
		width: calc(100% - 40px);
		padding: 0 20px;
	}

	.bottom-section {
		z-index: 1;
		width: calc(100% - 40px);
		padding: 0 20px;
	}

	.left-section {
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 10px;
	}

	.center-section {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.right-section {
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 10px;
	}

	.hero {
		display: none;
		&.expand {
			display: block;
		}
	}

	.footer {
		display: none;
		&.expand {
			display: flex;
			flex-direction: flex-end;
		}
	}

	.notch {
		width: 100%;
		justify-content: center;
		align-items: center;
		display: none;
		margin-top: 5px;
		&.show {
			display: flex;
		}
	}
</style>
