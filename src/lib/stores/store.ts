import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const clicks = writable(+((browser && localStorage.getItem('clicks')) || '0'));

clicks.subscribe((val) => {
  if (browser) return (localStorage.clicks = `${val}`);
});

