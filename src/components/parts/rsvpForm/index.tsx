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


const RSVPForm = ({ people, toggleDialog }) =>
{
	return (
		<form action={submit}>
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
			<SubmitButton toggleDialog={toggleDialog} />
		</form>
	)
}

export default RSVPForm