'use client'

import RSVPForm from '@parts/rsvpForm';
import { useRef } from 'react';
import Dialog from '@parts/dialog'
import { Guest as GuestType, NotionPerson } from '@ts/people';

const statuses = {
	'RSVPed': 'rsvp',
	'Invited': 'invited',
	'Not Invited': 'invited',
	'Save the Date': 'invited',
	'Declined': 'declined'
}

type GuestProps = {
	people: NotionPerson[]
	guest: GuestType

}

const Guest = ({ people, guest }: GuestProps) =>
{
	const dialog = useRef<HTMLDialogElement>(null)
	const closeModal = () => dialog.current?.close()
	const status = statuses[guest.status]

	return (
		<>
			<p>
				{status === 'invited' && `And we hope that you can join us there, ${ guest.name }`}
				{status === 'rsvp' && `We're so excited to have you join us, ${ guest.name }!`}
				{status === 'declined' && `Sorry you can't make it, we'll miss you!`}
			</p >
			<Dialog
				openButton={status === 'invited' ? 'RSVP Now!' : 'Update RSVP'}
				dialog={dialog}
			>
				<RSVPForm people={people} closeModal={closeModal} guest={guest} />
			</Dialog>
		</>
	)
}

export default Guest