"use client"

import { load, trackEvent, trackPageview } from "fathom-client"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

type EventTypes = 'Signed In' | 'Gift Claimed' | 'RSVP Form Submitted' | 'Initial RSVP'

const TrackPageView = () =>
{
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() =>
	{
		load(process.env.NEXT_PUBLIC_FATHOM_SITE, {
			includedDomains: [process.env.URL]
		})
	}, [])

	useEffect(() =>
	{
		trackPageview()
	}, [pathname, searchParams])

	return null
}

export const TrackEvent = ({ name }: { name: EventTypes }) =>
{
	useEffect(() =>
	{
		load(process.env.NEXT_PUBLIC_FATHOM_SITE, {
			includedDomains: [process.env.URL]
		})
	}, [])

	useEffect(() =>
	{
		trackEvent(name)
	}, [name])

	return null
}

const Fathom = () =>
{
	return (
		<Suspense fallback={null}>
			<TrackPageView />
		</Suspense>
	)
}

export default Fathom