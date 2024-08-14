import { NotionRunsheetEvent, RunsheetData, RunsheetEvent } from "@ts/runsheet"
import { parse } from "date-fns"

type formatRunsheetProps = {
	guestName: string
	type: 'guest' | 'vendor'
	sheets: {
		id: string
		name: string
	}[]
	events: NotionRunsheetEvent[]
}

const compareSheets = (sheet_1: string[], sheet_2: string[]) =>
{
	if (sheet_1.length !== sheet_2.length) return false;

	const sheet_1_sorted = sheet_1.slice().sort();
	const sheet_2_sorted = sheet_2.slice().sort();

	for (let i = 0; i < sheet_1_sorted.length; i++)
	{
		if (sheet_1_sorted[i] !== sheet_2_sorted[i]) return false;
	}
	return true;
}

const compareRunsheets = (...sheets: string[][]): boolean =>
{
	if (sheets.length < 2) return true

	for (let i = 1; i < sheets.length; i++)
	{
		if (!compareSheets(sheets[0], sheets[i])) return false;
	}

	return true;
}

export const formatEvent = (event: NotionRunsheetEvent): RunsheetEvent =>
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
		notes: event.properties.Notes.rich_text.map(note => note.plain_text).join('\n'),
		guests: []
	}

	return eventData
}

const formatRunsheet = (props: formatRunsheetProps) =>
{
	const { sheets, events, guestName, type } = props
	let formattedEvents: RunsheetData = {}

	console.log({sheets, events})

	sheets?.forEach(({ id, name }) =>
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
				if (
					formattedEvents?.[id]
					&& formattedEvents[id].eventIds
					&& !formattedEvents[id].eventIds?.includes(event.id)
				)
				{
					formattedEvents[id].events.push(eventData)
					formattedEvents[id].eventIds?.push(event.id)
				}
			})

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
					if (
						formattedEvents?.[id]
						&& formattedEvents[id].eventIds
						&& !formattedEvents[id].eventIds?.includes(event.id)
					)
					{
						formattedEvents[id].events.push(eventData)
						formattedEvents[id].eventIds?.push(event.id)
					}
				})
		}
		else if (type === 'vendor')
		{
			const vendor = sheets[0].id
			formattedEvents[vendor].events.push(eventData)
			formattedEvents[vendor].eventIds?.push(event.id)
		}
	})

	if (compareRunsheets(...Object.values(formattedEvents).map(({ eventIds }) => eventIds ?? [])))
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
		sheet.events.sort((a, b) =>
		{
			if (a.end && b.end) return a.end.getTime() - b.end.getTime()
			else if (a.end) return -1
			else if (b.end) return 1
		})
	})

	return formattedEvents
}

export default formatRunsheet