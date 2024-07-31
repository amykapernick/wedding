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

const formatSchedule = (props: formatRunsheetProps) =>
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
			// if (eventData.name == "Secret Family Shenanigans")
			// {
			// 	// console.log({ ...event.properties.Guests.rollup.array })
			// 	console.log({
			// 		guestIds: event.properties.Guests.rollup.array
			// 			.map(array => array.relation
			// 				.map(({ id }) => id)
			// 				.join(',')
			// 			).join(',')
			// 	})
			// 	// console.log({ ...event.properties.GuestIds })
			// }

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
					// console.log({ id })
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

		console.log({ guests: eventData.guests })

		if (eventData.guests.length === Object.entries(guests).length - 1)
		{
			eventData.guests = [guestName]
		}

		formattedEvents.push({
			...eventData,
			title: eventData.name
		})
	})

	return {
		events: formattedEvents,
		startDate,
		endDate,
		guests,
		type
	}
}

export default formatSchedule