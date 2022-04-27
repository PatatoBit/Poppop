import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const text = writable(+((browser && localStorage.getItem('text')) || 'Neutral'));

text.subscribe((val) => {
  if (browser) return (localStorage.guild = `${val}`);
});

