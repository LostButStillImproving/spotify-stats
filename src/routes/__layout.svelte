<script>
	import { timeSpan } from '../store';
	import { ButtonGroup } from 'sveltestrap';
	import { Button } from 'svelte-materialify';
	import Login from '../components/Login.svelte';
</script>

<div class = 'menu'>
	<ButtonGroup>
		<Button id ="button" on:click={() => timeSpan.set("short_term")}>Short Term</Button>
		<Button on:click={() => timeSpan.set("medium_term")}>Medium Term</Button>
		<Button on:click={() => timeSpan.set("long_term")}>Long term</Button>
	</ButtonGroup>
	<Login/>
</div>

<slot></slot>
<style>
    .menu {
        display:inline-flex;
        margin-left:30em;
        justify-content: center;
        margin-top: 3em;
    }
</style>