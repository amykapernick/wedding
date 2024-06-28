import { NotionRunsheetEvent, RunsheetData, RunsheetEvent } from "@ts/runsheet"
import { isBefore, parse } from "date-fns"
import { formatEvent } from "./formatRunsheet"

type formatRunsheetProps = {
	guestName: string
	type: 'guest' | 'vendor'
	guests: Record<string, {
		id: string
		name: string
	}>
	events: NotionRunsheetEvent[]
}

const formatSchedule = (props: formatRunsheetProps) =>
{
	const { guests, events, type, guestName } = props
	let formattedEvents: RunsheetEvent[] = []
	let startDate = new Date(process.env.NEXT_PUBLIC_EVENT_START as string)
	let endDate = new Date(process.env.NEXT_PUBLIC_EVENT_START as string)

	events.forEach((event) =>
	{
		let eventData = formatEvent(event)

		if (isBefore(eventData.start, startDate))
		{
			startDate = eventData.start
		}

		if (eventData.end && isBefore(endDate, eventData.end))
		{
			endDate = eventData.end
		}

		if (type === 'guest')
		{
			event.properties.GuestIds.formula.string.split(',').forEach((id: string) =>
			{
				if (guests[id])
				{
					eventData.guests.push(guests[id].name)
				}
			})
		}
		// else if (type === 'vendor')
		// {
		// 	const vendor = sheets[0].id
		// 	formattedEvents[vendor].events.push(eventData)
		// 	formattedEvents[vendor].eventIds.push(event.id)
		// }

		if (eventData.guests.length === Object.entries(guests).length - 1)
		{
			eventData.guests = [guestName]
		}

		formattedEvents.push(eventData)
	})

	return {
		events: formattedEvents,
		startDate,
		endDate,
		guests
	}
}

export default formatSchedule