'use client'

import { Client } from '@notionhq/client'
import { currentUser } from '@clerk/nextjs';
import RSVPForm from '@parts/rsvpForm';
import { useRef, useState } from 'react';
import Script from 'next/script';



const Guest = ({ people }) =>
{
	const [dialog, toggleDialog] = useState(false)

	return (
		<>
			<dialog open={dialog}>
				<button onClick={() => toggleDialog(false)}>Close</button>
				<RSVPForm people={people} toggleDialog={toggleDialog} />
			</dialog>
			<button onClick={() => toggleDialog(true)}>Show the dialog</button>
		</>
	)
}

export default Guest