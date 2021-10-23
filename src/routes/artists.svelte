<svelte:head>
	<title>Top artists on Spotify..</title>
</svelte:head>


<script>

import { apiData, drinkNames } from '../store';
import ListView from '../components/trackList.svelte';
import { onMount} from 'svelte';

onMount(async () => {
	await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon')
		.then(response => response.json())
		.then(data => {
			console.log(data);
			apiData.set(data);
		}).catch(error => {
			console.log(error);
			return [];
		});
});

</script>

<main>
	<div class='container'>
		{#each $drinkNames as name}
			<ListView {name}/>
		{/each}
	</div>
</main>
<style>
	.container {
			display: grid;
			margin-top: 5em;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: repeat(10, 1fr);
			gap: 5px;
  }
</style>

