import { NotionRunsheetEvent, RunsheetData } from "@ts/runsheet"
import { format, parse, parseISO } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

type formatRunsheetProps = {
	guestName: string
	type: 'guest' | 'vendor'
	sheets: {
		id: string
		name: string
	}[]
	events: NotionRunsheetEvent[]
}

const formatEvent = (event: NotionRunsheetEvent) =>
{
	const eventData = {
		name: event.properties.Name.title[0].plain_text,
		tags: event.properties.Tags.multi_select.map(tag => tag.name),
		start: parse(
			event.properties.Date.date.start,
			'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx',
			new Date()
		),
		end: event.properties.Date.date.end ? parse(
			event.properties.Date.date.end,
			'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx',
			new Date()
		) : null,
		notes: event.properties.Notes.rich_text.map(note => note.plain_text).join('\n')
	}

	return eventData
}

const formatRunsheet = (props: formatRunsheetProps) =>
{
	const { sheets, events, guestName, type } = props
	let formattedEvents: RunsheetData = {}

	sheets.forEach(({ id, name }) =>
	{
		formattedEvents[id.replaceAll('-', '')] = {
			name: name,
			id: id,
			events: [],
			eventIds: []
		}
	})

	events.forEach((event) =>
	{
		const eventData = formatEvent(event)

		if (type === 'guest')
		{
			event.properties.GuestIds.formula.string.split(',').forEach((id: string) =>
			{
				if (formattedEvents[id])
				{
					formattedEvents[id].events.push(eventData)
					formattedEvents[id].eventIds.push(event.id)
				}
			})
		}
	})

	if (
		Object.values(formattedEvents).map(({ eventIds }) => eventIds).every((eventIds, i, arr) => eventIds.every((eventId, j, arr) => eventId === arr[0][j]))
	)
	{
		formattedEvents = {
			all: {
				name: guestName,
				id: 'all',
				events: events.map((event) => formatEvent(event)),
				eventIds: events.map((event) => event.id)
			}
		}
	}

	Object.values(formattedEvents).forEach((sheet) =>
	{
		sheet.events.sort((a, b) => a.start.getTime() - b.start.getTime())
	})

	return formattedEvents
}

export default formatRunsheet