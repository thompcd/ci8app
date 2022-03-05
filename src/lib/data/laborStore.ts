import { derived, writable, get } from 'svelte/store';
import { browser } from "$app/env"

export const laborStore = writable(browser && JSON.parse(localStorage.getItem('labor')))
// Anytime the store changes, update the local storage value.
laborStore.subscribe((value) => {
    if (browser) return localStorage.labor = JSON.stringify(value)
})