<script>
	import { accessToken, tokenExpired } from '../store';
	require('dotenv').config()

	const getHashParams = () => {
		const hashParams = {};
		let e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while (e = r.exec(q)) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	};

	let parsed = {};
	if (typeof window !== "undefined") {
		parsed = getHashParams();
	}
	let href = `https://accounts.spotify.com/authorize
																									 ?client_id=${process.env['CLIENT_ID ']}
																									 &response_type=token&scope=user-top-read user-read-private
																									 &redirect_uri=${process.env['REDIRECT_URI ']}`;
	let has_access = typeof parsed.access_token !== "undefined";

	if (has_access) {
		accessToken.set(parsed.access_token)
		tokenExpired.set(false)
	}
	console.log(`has_access : ${has_access}, token: ` + $accessToken);
</script>

<div>
	<div>
		<a href="{href}">
			<h4>First login to spotify</h4>
    </a>
	</div>
	<div id="loggedin"></div>
</div>
