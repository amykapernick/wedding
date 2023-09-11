<script>
	import {onMount} from 'svelte'
	import { Client } from '@notionhq/client'

	export let people = {};

	

	let data
	const mealOptions = ['Steak', 'Fish', 'Vegetarian'];
	const pageID = 'aea30e5d2343423489473eb9d92645b8'

	onMount(async () => {
		const notion = new Client({
		auth: process.env.NOTION_API_KEY
	})
	
		data = await notion.pages.retrieve({ page_id: pageID })
	})

	console.log({data})
</script>

<form>
	<h2>RSVP Now</h2>
	{#each people.adults as person, i}
		<label for={`name_${i}`}>Name</label>
		<input type="text" name={`name_${i}`} id={`name_${i}`} value={person.name} required />

		<label for={`email_${i}`}>Email</label>
		<input type="email" name={`email_${i}`} id={`email_${i}`} />

		<label for={`meal_adult_${i}`}>Meal</label>
		<select name={`meal_adult_${i}`} id={`meal_adult_${i}`} required>
			{#each mealOptions as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
		
		<label for={`dietary_adult_${i}`}>Dietary requirements</label>
		<textarea name={`dietary_adult_${i}`} id={`dietary_adult_${i}`}></textarea>
	{/each}

	<h3>Children</h3>
	{#each people.children as person, i}
		<label for={`name_child_${i}`}>Name</label>
		<input type="text" name={`name_child_${i}`} id={`name_child_${i}`} value={person.name} required />

		<label for={`age_${i}`}>Age</label>
		<input type="text" name={`age_${i}`} id={`age_${i}`} required>
		
		<label for={`dietary_child_${i}`}>Dietary requirements</label>
		<textarea name={`dietary_child_${i}`} id={`dietary_child_${i}`}></textarea>
	{/each}

	<button type="submit">RSVP</button>
</form>