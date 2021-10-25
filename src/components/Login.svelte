<script>
	import { href_login, loggedIn} from '../store';
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
			loggedIn.set(false)}}>Logout</Button>
	</div>
{/if}

<style>
	.log {
			display: flex;
			justify-content: center;
			margin-top: 3em;
  }
</style>