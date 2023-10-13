'use client'

import { Fragment } from 'react';
import Adult from './adult';
import Child from './child';

import styles from './styles.module.css'

const RSVPForm = ({people}) => {
	return (
		<form>
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