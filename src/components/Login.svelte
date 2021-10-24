<script>
	import {accessToken, tokenExpired} from '../store';
	import  {CLIENT_ID, REDIRECT_URI} from '../../env';
	import { Button } from 'sveltestrap';


	function getHashParams() {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while (e = r.exec(q)) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	let parsed = {};
	if (typeof window !== "undefined") {
		parsed = getHashParams();
	}
	let href_login = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=user-top-read user-read-private&redirect_uri=${REDIRECT_URI}&show_dialog=true`;
	let has_access = typeof parsed.access_token !== "undefined";

	if (has_access) {
		accessToken.set(parsed.access_token)
		tokenExpired.set(false)
	}
</script>

{#if $tokenExpired}
	<div class = 'log'>
		<div>
			<a href="{href_login}">
				<Button>Log in to Spotify</Button>
			</a>
		</div>
	</div>
{:else }
	<div class = 'log'>
		<Button on:click = {() => {
			console.log($tokenExpired)
			tokenExpired.set(true)
			accessToken.set("")}}
			>Logout</Button>
	</div>
{/if}

<style>
	.log {
			display: flex;
			justify-content: center;
			margin-top: 3em;
  }
</style>