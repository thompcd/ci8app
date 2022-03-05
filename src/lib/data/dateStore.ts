import { derived, writable } from 'svelte/store';
import { getDate } from '$lib/interfaces/customDateTime';

import type { Writable, Readable } from 'svelte/store';
import type { CustomDateTime } from '../interfaces/customDateTime';

export const today = new Date();

// Setup a work order store based on projected days into future requested
export const daysIntoFuture: Writable<number> = writable(3);

export const cuttoffDate: Readable<CustomDateTime> = derived(daysIntoFuture, $daysIntoFuture => getDate(today.setDate(today.getDate() + $daysIntoFuture)))
