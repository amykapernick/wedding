'use client'

import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

export function SubmitButton ({ closeModal }: { closeModal: () => void })
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
		<button type="submit" aria-disabled={pending}>
			{pending ? 'Submitting...' : 'Send Response'}
		</button>
	)
}