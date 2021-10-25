import { readable, writable } from 'svelte/store'
import { CLIENT_ID, REDIRECT_URI } from '../env'
export const tokenExpired = writable(false)
export const timeSpan = writable("short_term")
export const href_login = readable(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=user-top-read user-read-private&redirect_uri=${REDIRECT_URI}&show_dialog=true`)
export const loggedIn = writable(false)
export const token = readable("", (set) =>{
	let parsed = {};
	if (typeof window !== "undefined") {
		parsed = getHashParams();
	}
	let has_access = typeof parsed.access_token !== "undefined";

	if (has_access) {
		set(parsed.access_token);
		loggedIn.set(true)
	}
})

function getHashParams() {
	const hashParams = {};
	let e, r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	while (e = r.exec(q)) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
}

