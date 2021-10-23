<script>
	import Login from '../components/Login.svelte';
	import {tokenExpired} from '../store';

</script>
<svelte:head>
	<title>Welcome</title>
</svelte:head>

{#if $tokenExpired}
	<Login />
{/if}
