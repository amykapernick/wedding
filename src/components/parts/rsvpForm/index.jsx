'use client'

import { Fragment } from 'react';
import Adult from './adult';
import Child from './child';

import styles from './styles.module.css'

const notionFields = {
	'age': 'Age',
	'attending': 'Attending',
	'child': 'Child',
	'dietary': 'Dietary Requirements',
	'meal': 'Meal',
}

const RSVPForm = ({people}) => {
	const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.target
		const data = new FormData(form)
		const entries = Object.fromEntries(data.entries())
		const updatedData = {}

		Object.entries(entries).forEach(([key, value]) => {
			const [type, id] = key.split('_')
			let fieldValue = value

			if(!updatedData[id]) {
				updatedData[id] = {}
			}

			if(type === 'child') {
				fieldValue = true
			}

			updatedData[id] = {
				...updatedData[id],
				[notionFields[type]]: fieldValue
			}

			
		})

		console.log({updatedData})
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>RSVP Now</h2>
			{people.sort((a, b) => a.properties.Child.checkbox - b.properties.Child.checkbox).map(person => (
				<Fragment key={person.id}>
					{person.properties.Child.checkbox ?
						<Child {...person} />
					:
						<Adult {...person} />
					}
				</Fragment>
			))}
			<button type="submit">RSVP</button>
		</form>
	)
}

export default RSVPForm