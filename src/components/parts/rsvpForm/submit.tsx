'use client'

import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { TrackEvent } from '@parts/fathom'

export function SubmitButton ({ closeModal }: Readonly<{ closeModal: () => void }>)
{
	const [submitting, setSubmitting] = useState(false)
	const { pending } = useFormStatus()

	useEffect(() =>
	{
		if (!submitting && pending)
		{
			setSubmitting(true)
		}
		if (submitting && !pending)
		{
			setSubmitting(false)
			closeModal()
		}
	}, [pending])

	return (
		<>
			{pending && <TrackEvent name="RSVP Form Submitted" />}
			<button type="submit" aria-disabled={pending}>
				{pending ? 'Submitting...' : 'Send Response'}
			</button>
		</>
	)
}