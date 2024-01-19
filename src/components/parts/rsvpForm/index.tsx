'use client'

import { Fragment } from 'react';
import Adult from './adult';
import Child from './child';
import styles from './styles.module.css'
import { SubmitButton } from './submit';
import { submit } from '@app/actions'
import type { Guest, NotionPerson, Person } from '@ts/people';

type FormTypes = {
	people: NotionPerson[]
	guest: Guest
	closeModal: () => void
	open: boolean
}

const RSVPForm = ({ people, closeModal, guest, open }: FormTypes) =>
{
	const handleSubmit = submit.bind(null, guest.id)

	return (
		<form action={handleSubmit} className={styles.form} data-open={open}>
			{people.sort((a, b) => Number(a.properties.Child.checkbox) - Number(b.properties.Child.checkbox)).map(({ id, properties }) =>
			{
				const data: Person = {
					id: id,
					name: {
						full: properties.Name.title?.[0]?.plain_text,
						first: properties['First Name'].rich_text?.[0]?.plain_text,
						last: properties['Last Name'].rich_text?.[0]?.plain_text
					},
					attending: properties.Attending?.select?.name,
					meal: properties.Meal?.select?.name,
					dietary: properties['Dietary Requirements']?.rich_text?.[0]?.text.content,
					age: parseInt(properties.Age?.rich_text?.[0]?.plain_text),
					child: properties.Child?.checkbox,
					song: properties['Song']?.rich_text?.[0]?.text.content,
				}

				return (
					<Fragment key={data.id}>
						{data.child && <Child {...data} />}

						{!data.child && <Adult {...data} />}
					</Fragment>
				)
			})}
			<SubmitButton closeModal={closeModal} />
		</form>
	)
}

export default RSVPForm