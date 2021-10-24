import {writable } from 'svelte/store';
export const accessToken = writable("")
export const tokenExpired = writable(true)
export const timeSpan = writable("short_term")
