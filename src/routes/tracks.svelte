
<svelte:head>
	<title>Your top spotify tracks</title>
</svelte:head>


<script>

	import { accessToken, tokenExpired } from '../store';
	import { onMount } from 'svelte';
	import ListView from '../components/trackList.svelte';

	let token;
	accessToken.subscribe(value => token = value)
	const trackMap = (item) => {
		return {
			name: item.name,
			art: item.album.images[1].url,
			info: `Artist: ${item.artists[0].name}\nAlbum: ${item.album.name}`,
			link: item.external_urls.spotify,
		};
	};

	let collection;
	async function getCollection() {

		const url = new URL(`https://api.spotify.com/v1/me/top/tracks?`);
		const params = new URLSearchParams({
			time_range: "short_term",
			limit: 10,
			offset: 0,
		});

		if (token) {
			const res = await fetch(url + params, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});

			if (res.ok) {

				const data = await res.json();
				collection = data.items.map(trackMap);
			} else {

				tokenExpired.set(true);
			}
		}
	}
	onMount(getCollection);
</script>

{#if collection}
	<div class='container'>
		{#each collection as {art, name, link}}
			<ListView {art} {name} {link}/>
		{/each}
	</div>
{/if}

<style>
    .container {
        display: grid;
        margin-top: 5em;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(1, 1fr);
				align-items: start;
        gap: 5em;
    }
</style>
