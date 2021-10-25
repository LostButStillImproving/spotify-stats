<script>
	import { href_login, loggedIn, logout} from '../store';
	import { Button } from 'sveltestrap';
</script>

{#if !$loggedIn}
	<div class = 'log'>
		<div>
			<a href="{$href_login}">
				<Button>Log in to Spotify</Button>
			</a>
		</div>
	</div>
{:else }
	<div class = 'log'>
		<Button on:click = {() => {
			logout()}}>Logout</Button>
	</div>
{/if}

<style>
	.log {
			display: flex;
  }
</style>