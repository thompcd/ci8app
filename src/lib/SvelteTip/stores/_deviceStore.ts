import { readable, writable, derived } from 'svelte/store';
import { browser } from '$app/env';
import { breakpoints } from '../config/breakpoints';

// device detection
const appWidth = writable(0);
const appHeight = writable(0);

const { mobile, tablet, desktop } = breakpoints;

function deviceStoreInit() {
	return {
		appWidth,
		appHeight,
		isMobile: derived(appWidth, ($appWidth) => {
			return $appWidth >= mobile.min && $appWidth < mobile.max;
		}),
		isTablet: derived(appWidth, ($appWidth) => {
			return $appWidth >= tablet.min && $appWidth < tablet.max;
		}),
		isDesktop: derived(appWidth, ($appWidth) => {
			return $appWidth >= desktop.min;
		}),

		isTabletAndAbove: derived(appWidth, ($appWidth) => {
			return $appWidth > tablet.min;
		}),
		isTabletAndBelow: derived(appWidth, ($appWidth) => {
			return $appWidth < tablet.max;
		}),

		isNativeMobile: readable(
			browser
				? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
				: false,
			() => {}
		)
	};
}

export const DeviceStore = deviceStoreInit();
