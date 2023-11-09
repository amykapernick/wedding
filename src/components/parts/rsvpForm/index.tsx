'use client'

import { Fragment, useEffect, useState } from 'react';
import Adult from './adult';
import Child from './child';
import { Client } from '@notionhq/client';
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import styles from './styles.module.css'
import { SubmitButton } from './submit';
import { submit } from '../../../app/actions'

import { useFormStatus } from 'react-dom'


const RSVPForm = ({ people, toggleDialog, guest }) =>
{
	const handleSubmit = submit.bind(null, guest)

	return (
		<form action={handleSubmit}>
			<h2>RSVP Now</h2>
			{people.sort((a, b) => a.properties.Child.checkbox - b.properties.Child.checkbox).map(({ id, properties }) =>
			{
				const data = {
					id: id,
					name: properties.Name.title?.[0]?.plain_text,
					attending: properties.Attending?.select?.name,
					meal: properties.Meal?.select?.name,
					dietary: properties['Dietary Requirements']?.rich_text?.[0]?.text.content,
					age: properties.Age?.rich_text?.[0]?.text.content
				}

				return (
					<Fragment key={data.id}>
						{properties.Child?.checkbox ?
							<Child {...data} />
							:
							<Adult {...data} />
						}
					</Fragment>
				)
			})}
			<SubmitButton toggleDialog={toggleDialog} />
		</form>
	)
}

export default RSVPForm