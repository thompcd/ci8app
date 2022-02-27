import { writable } from 'svelte/store';
import { browser } from '$app/env';

//-------------------------------
// localstorage setup
const lsName = 'siteStore';

const defaults = {
	urlHash: null,
	urlParams: null,
	searchValue: null,
	openNotch: true,
	openSidebar: true,
	shrinkHeader: false,
	innerContainerAdditionalHeight: 0
};

const ls =
	browser && !!localStorage.getItem(lsName)
		? // pull from ls
		  JSON.parse(localStorage.getItem(lsName))
		: // defaults
		  defaults;

const _store = {
	urlHash: ls.urlHash || defaults.urlHash,
	urlParams: ls.urlParams || defaults.urlParams,
	searchValue: ls.searchValue || defaults.searchValue,
	openNotch: ls.openNotch || defaults.openNotch,
	openSidebar: ls.openSidebar || defaults.openSidebar,
	shrinkHeader: ls.shrinkHeader || defaults.shrinkHeader,
	innerContainerAdditionalHeight:
		ls.innerContainerAdditionalHeight || defaults.innerContainerAdditionalHeight
};
//-------------------------------

//-------------------------------
// create/export store
const urlHash = writable(_store.urlHash);
const urlParams = writable(_store.urlParams);
const searchValue = writable(_store.searchValue);
const openNotch = writable(_store.openNotch);
const openSidebar = writable(_store.openSidebar);
const shrinkHeader = writable(_store.shrinkHeader);
const innerContainerAdditionalHeight = writable(_store.innerContainerAdditionalHeight);

function siteInit() {
	return {
		urlHash,
		urlParams,
		openSidebar,
		openNotch,
		searchValue,
		shrinkHeader,
		innerContainerAdditionalHeight
	};
}

export const SiteStore = siteInit();
//-------------------------------

//-------------------------------
// subscribe to watch for changes
openNotch.subscribe((val) => {
	_store.openNotch = val;
});

openSidebar.subscribe((val) => {
	_store.openSidebar = val;
});

innerContainerAdditionalHeight.subscribe((val) => {
	_store.innerContainerAdditionalHeight = val;
});
//-------------------------------

//-------------------------------
if (browser) {
	//-------------------------------
	// remove after loaded
	localStorage.removeItem(lsName);
	//-------------------------------

	//-------------------------------
	// save
	window.addEventListener('beforeunload', () => {
		localStorage.setItem(lsName, JSON.stringify(_store));
	});
	//-------------------------------
}
//-------------------------------
