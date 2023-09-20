import { Client } from '@notionhq/client'
import { useUser } from '@clerk/clerk-react';	
import { Fragment, useEffect, useState } from 'react';

const mealOptions = ['Steak', 'Fish', 'Vegetarian'];
const pageID = 'aea30e5d2343423489473eb9d92645b8'

const RSVPForm = ({people}) => {
	const {isSignedIn, user, isLoaded} = useUser()
	const [data, setData] = useState({})
	// const notion = new Client({
	// 	auth: import.meta.env.VITE_NOTION_API_KEY
	// })

	// console.log({env: import.meta.env.VITE_NOTION_API_KEY, notion})

	// useEffect(() => {
	// 	const getData = async () => {
	// 		const data = await notion.pages.retrieve({ page_id: pageID })
	// 		setData(data)
	// 	}
	// 	getData()
	// }, [])


	// console.log({...data})

	return (
		<form>
			<h2>RSVP Now</h2>
			{people.adults.map((person, i) => (
				<Fragment key={i}>
					<label htmlFor={`name_${i}`}>Name</label>
					<input type="text" name={`name_${i}`} id={`name_${i}`} defaultValue={person.name} required />

					<label htmlFor={`email_${i}`}>Email</label>
					<input type="email" name={`email_${i}`} id={`email_${i}`} />

					<label htmlFor={`meal_adult_${i}`}>Meal</label>
					<select name={`meal_adult_${i}`} id={`meal_adult_${i}`} required>
						{mealOptions.map(option => (
							<option value={option} key={option}>{option}</option>
						))}
					</select>
					
					<label htmlFor={`dietary_adult_${i}`}>Dietary requirements</label>
					<textarea name={`dietary_adult_${i}`} id={`dietary_adult_${i}`}></textarea>
				</Fragment>
			))}

			<h3>Children</h3>
			{people?.children?.map((person, i) => (
				<Fragment key={i}>
					<label htmlFor={`name_child_${i}`}>Name</label>
					<input type="text" name={`name_child_${i}`} id={`name_child_${i}`} defaultValue={person.name} required />

					<label htmlFor={`age_${i}`}>Age</label>
					<input type="text" name={`age_${i}`} id={`age_${i}`} required />
					
					<label htmlFor={`dietary_child_${i}`}>Dietary requirements</label>
					<textarea name={`dietary_child_${i}`} id={`dietary_child_${i}`}></textarea>
				</Fragment>
			))}

			<button type="submit">RSVP</button>
		</form>
	)
}

export default RSVPForm