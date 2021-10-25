import { readable, writable } from 'svelte/store'
import { CLIENT_ID} from '../env';
export const tokenExpired = writable(false)
export const timeSpan = writable("short_term")
export const href_login = readable(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=user-top-read user-read-private&redirect_uri=https://spotify-stats-5typuqp64-lostbutstillimproving.vercel.app/&show_dialog=true`)
export const loggedIn = writable(false)
export const token = writable("", (set) =>{
	set(login())
})

export const logout = () => {
	loggedIn.set(false);
	token.set("")
	tokenExpired.set(true)
}
const login = () => {
	let parsed = {};
	if (typeof window !== "undefined") {
		parsed = getHashParams();
	}
	let has_access = typeof parsed.access_token !== "undefined";

	if (has_access) {
		loggedIn.set(true)
		return parsed.access_token;
	}
}

function getHashParams() {
	const hashParams = {};
	let e, r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	while (e = r.exec(q)) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
}