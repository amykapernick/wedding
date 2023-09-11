<script>
	import '../styles/app.postcss';
	import RSVPForm from '$lib/parts/rsvpForm.svelte';

	const people = {
		adults: [
			{
				name: 'Bec',
			},
			{
				name: 'Wilson'
			}
		],
		children: [
			{
				name: 'Peter'
			},
			{
				name: 'Clair'
			}
		]
	}
</script>

<style lang="postcss">
	
</style>

<main>
	<header>
		<h1>Dan and Amy are getting married!</h1>
	</header>
	<RSVPForm people={people} />
	<slot />
</main>