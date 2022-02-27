import { writable } from 'svelte/store';
import { browser } from '$app/env';

const modalIsOpen = writable(false);
const modalProps = writable(null);
const modalIsBusy = writable(false);
const onModalSubmit = writable(null);

const setModalState = (active: boolean) => {
	if (browser) {
		if (active) {
			location.hash = 'modal?open=true';
			modalIsOpen.set(true);
		} else {
			if (location.hash.includes('modal?open=true')) {
				location.hash = 'modal?open=false';
			} else {
			}
			modalIsOpen.set(false);
		}
	}
};

function modalStore() {
	return {
		modalIsOpen,
		modalIsBusy,
		modalProps,
		onModalSubmit,
		setModalState
	};
}

setModalState(false);

export const ModalStore = modalStore();
