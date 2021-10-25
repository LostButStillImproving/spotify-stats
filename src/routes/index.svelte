
<svelte:head>
	<title>Your top spotify tracks</title>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
	/>
	header("Access-Control-Allow-Origin: *");
</svelte:head>


<script>

	import { tokenExpired, timeSpan, token, loggedIn } from '../store';
	import { onMount } from 'svelte';
	import Track from '../components/Track.svelte';

	timeSpan.subscribe(getCollection)
	let collection;
	async function getCollection() {

		const url = new URL(`https://api.spotify.com/v1/me/top/tracks?`);
		const params = new URLSearchParams({
			time_range: $timeSpan,
			limit: 10,
			offset: 0,
		});

		if ($token) {
			const res = await fetch(url + params, {
				headers: {
					Authorization: "Bearer " + $token,
				},
			});

			if (res.ok) {
				const trackMap = (item) => {
					return {
						name: item.name,
						art: item.album.images[1].url,
						info: `Artist: ${item.artists[0].name}\nAlbum: ${item.album.name}`,
						link: item.external_urls.spotify,
					};
				};
				const data = await res.json();
				collection = data.items.map(trackMap);
			} else {

				tokenExpired.set(true);
			}
		}
	}
	onMount(getCollection);
</script>

{#if collection && $loggedIn}
	<div class='container'>
		{#each collection as {art, name, link}}
			<Track {art} {name} {link}/>
		{/each}
	</div>
{/if}

<style>
    .container {
        display: grid;
				width: fit-content;
				margin-top: 5em;
        margin-left: 25em;
				margin-right: auto;
        grid-template-columns: repeat(2, 1fr);
        gap: 1em;
    }
</style>
