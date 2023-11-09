'use client'

import { Client } from '@notionhq/client'
import { currentUser } from '@clerk/nextjs';
import RSVPForm from '@parts/rsvpForm';
import { useRef, useState } from 'react';
import Script from 'next/script';



const Guest = ({ people, guest }) =>
{
	const [dialog, toggleDialog] = useState(false)

	return (
		<>
			{guest.status !== 'RSVPed' && `We hope to see you there, ${ guest.name }`}
			<dialog open={dialog}>
				<button onClick={() => toggleDialog(false)}>Close</button>
				<RSVPForm people={people} toggleDialog={toggleDialog} guest={guest.id} />
			</dialog>
			<button onClick={() => toggleDialog(true)}>RSVP Now!</button>
		</>
	)
}

export default Guest