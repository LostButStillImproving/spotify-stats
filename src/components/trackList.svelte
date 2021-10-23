<script>
	export let link
	export let name
	export let art
</script>

<div class="container">
	<a href='{link}'>
		<img src='{art}' alt='{name}'>
		<h4 class='bottom-left'>{name}</h4>
	</a>
</div>

<style>
    .container {
        position: relative;
        font-family: Arial,serif;
    }
    .bottom-left {
        position: absolute;
        bottom: 8px;
        left: 16px;
				color: blue;
    }
</style>