import { derived, writable } from 'svelte/store';
import { getDate } from '$lib/interfaces/customDateTime';

import type { Writable, Readable } from 'svelte/store';
import type { CustomDateTime } from '../interfaces/customDateTime';
import { browser } from '$app/env';

export const today = new Date();

// Setup a work order store based on projected days into future requested
export const daysIntoFuture: Writable<number> = writable(browser && JSON.parse(localStorage.getItem('forecastingDaysIntoFuture')) || 21) 
daysIntoFuture.subscribe((value) => {
    if (browser) return localStorage.forecastingDaysIntoFuture = JSON.stringify(value)
});
export const cuttoffDate: Readable<CustomDateTime> = derived(daysIntoFuture, $daysIntoFuture => {
    const tempDate = new Date();
    return getDate(tempDate.setDate(today.getDate() + $daysIntoFuture))
});
