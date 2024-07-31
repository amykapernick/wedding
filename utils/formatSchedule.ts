import { NotionRunsheetEvent, RunsheetEvent } from "@ts/runsheet"
import { isBefore } from "date-fns"
import { formatEvent } from "./formatRunsheet"
import { CalendarEvent } from "calendar-link"

type formatRunsheetProps = {
	guestName: string
	type: 'guest' | 'vendor'
	guests: Record<string, {
		id: string
		name: string
	}>
	events: NotionRunsheetEvent[]
}

const formatSchedule = (props: formatRunsheetProps):
	{
		events: CalendarEvent[]
		startDate: Date
		endDate: Date
		guests: Record<string, {
			id: string
			name: string
		}>
		type: 'guest' | 'vendor'
	} =>
{
	const { guests, events, type, guestName } = props
	let formattedEvents: CalendarEvent[] = []
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
			event.properties.Guests.rollup.array
				.map(array => array.relation
					.map(({ id }) => id)
					.join(',')
				).join(',')
				.replaceAll('-', '')
				.split(',')
				.filter((value, index, self) => self.indexOf(value) === index)
				.forEach((id: string) =>
				{
					if (guests[id])
					{
						eventData.guests.push(guests[id].name)
					}
				})
		}

		if (eventData.guests.length === Object.entries(guests).length - 1)
		{
			eventData.guests = [guestName]
		}

		formattedEvents.push({
			...eventData,
			title: eventData.name
		} as CalendarEvent)
	})

	return {
		events: formattedEvents,
		startDate,
		endDate,
		guests,
		type,
	}
}

export default formatSchedule