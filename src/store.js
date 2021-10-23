import { derived, writable } from 'svelte/store';

export const accessToken = writable("")
export const tokenExpired = writable(true)
export const apiData = writable([]);

export const drinkNames = derived(apiData, ($apiData) => {
	if ($apiData.drinks){
		return $apiData.drinks.map(drink => drink.strDrink);
	}
	return [];
});

