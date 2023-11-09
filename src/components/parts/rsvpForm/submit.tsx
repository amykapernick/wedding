'use client'

import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

export function SubmitButton ({ toggleDialog })
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
			toggleDialog(false)
		}
	}, [pending])

	return (
		<button type="submit" aria-disabled={pending}>
			{pending ? 'Submitting...' : 'Submit'}
		</button>
	)
}