<script lang="ts">
	//--------------------------- IMPORTS
	import { setContext } from 'svelte';
	import { browser, dev } from '$app/env';
	import { navigating } from '$app/stores';

	import { assignColorsVars } from '@st-js/index';
	import { DeviceStore, SiteStore } from '@st-stores/index';

	import { colorScheme } from '../config/colorscheme';

	import HashWatch from '@system/HashWatch.svelte';
	import SnackBar from '@system/Snackbar.svelte';
	import Modal from '@system/Modal.svelte';
	import ProgressBar from '@layout/ProgressBar.svelte';

	// //--------------------------- STORES
	const { appWidth, appHeight } = DeviceStore;
	const { urlHash, urlParams, shrinkHeader } = SiteStore;

	//---------------------------  THEME
	let defaultTheme = 'dark';
	let theme = browser ? localStorage.getItem('theme') : 'dark';
	theme = theme === 'dark' || theme === 'light' ? theme : defaultTheme;
	if (browser) {
		localStorage.setItem('theme', theme);
	}
	setContext('theme', theme);
	//---------------------------

	//--------------------------- COLORS
	let ready = false;
	if (browser) {
		assignColorsVars(colorScheme, theme);
		setContext('colors', colorScheme);
		ready = true;
	}
	//---------------------------

	//--------------------------- WEBWORKERS
	// if (browser) {
	// 	const worker = new Worker(
	// 		dev ? '../../../static/workers/testWorker.js' : '/workers/testWorker.js'
	// 	);
	// 	worker.addEventListener(
	// 		'message',
	// 		(e) => {
	// 			// console.log('Worker loaded');
	// 		},
	// 		false
	// 	);
	// 	worker.postMessage('Hello World'); // Send data to our worker.
	// }

	//---------------------------  SNACKBAR CODE
	let snack;
	setContext('addSnack', (newSnack) => {
		snack = newSnack;
	});
	//---------------------------

	//--------------------------- HASHCHANGE
	let showLoader = false;
	let timer = null;
	let modalOpen: boolean = false;

	const hashChange = async ({ hash, params }) => {
		// // make available in store
		$urlHash = hash;
		$urlParams = params;
		// monitors modal
		modalOpen = hash === 'modal' && params.open === 'true' ? true : false;
	};
	//---------------------------

	//--------------------------- ROUTECHANGE
	navigating.subscribe((nav) => {
		if (!!nav) {
			const { to, from } = nav;
			if (to.path !== from.path) {
				$shrinkHeader = false;

				showLoader = true;

				clearTimeout(timer);
				timer = setTimeout(() => {
					showLoader = false;
				}, 800);
			}
		}
	});
</script>

<div id="svelte-tip-app" class:ready bind:clientWidth={$appWidth} bind:clientHeight={$appHeight}>
	<SnackBar {snack} />
	<Modal show={modalOpen} />
	<HashWatch onChange={hashChange} />
	<slot />
</div>

<div id="app-loader">
	<ProgressBar skinny nobg nomargin show={showLoader} />
</div>

<style lang="scss">
	@import '../style/svelteTip-styles.scss';

	#svelte-tip-app {
		opacity: 0;
		&.ready {
			opacity: 1;
		}
	}

	#app-loader {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1;
	}
</style>
