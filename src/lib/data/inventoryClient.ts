
import { variables } from '../../variables';
import { getContext, setContext } from 'svelte';
import { SaddleOakClient } from './saddleOakClient';

export function createClient(fetch: typeof global.fetch) {
    let c = new SaddleOakClient(fetch, variables.saddleOakClientId as string, variables.saddleOakBasePath as string);
    console.log("created saddle oak client")
    return c;
}
const contextKey = Symbol('InventoryClient');

export type Client = ReturnType<typeof createClient>;

export const getClient = (): Client => getContext(contextKey);

export const setClient = (client: Client): void => {
	setContext(contextKey, client);
};
