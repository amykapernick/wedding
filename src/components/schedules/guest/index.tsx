import { NotionRunsheetEvent, RunsheetEvent, NotionStakeholder } from "@ts/runsheet"
import { parseISO } from "date-fns"
import { ChannelBox, ChannelLogo, Epg, Layout, useEpg } from "planby"
import { useCallback, useEffect, useMemo, useState } from "react"
import Schedule from "../schedule"

type GuestRunsheetsProps = {
	runsheetEvents: NotionRunsheetEvent[]
	stakeholders: NotionStakeholder[]
}

const theme = {
	primary: {
		600: '#275942',
		900: 'transparent',
	},
	grey: { 300: '#d1d1d1' },
	white: '#fff',
	green: {
		300: '#2C7A7B',
	},
	loader: {
		teal: '#5DDADB',
		purple: '#3437A2',
		pink: '#F78EB6',
		bg: '#171923db',
	},
	scrollbar: {
		border: '#ffffff',
		thumb: {
			bg: '#e1e1e1',
		},
	},
	gradient: {
		blue: {
			300: '#002eb3',
			600: '#002360',
			900: '#051937',
		},
	},
	text: {
		grey: {
			300: '#a0aec0',
			500: '#718096',
		},
	},
	timeline: {
		divider: {
			bg: '#718096',
		},
	},
};

const GuestRunsheets = (props: GuestRunsheetsProps) =>
{
	const { runsheetEvents, stakeholders } = props
	const events: Record<string, RunsheetEvent> = {}
	const people: any[] = []
	let firstEvent: string = process.env.NEXT_PUBLIC_EVENT_START ?? ''
	let lastEvent: string = process.env.NEXT_PUBLIC_EVENT_END ?? ''

	runsheetEvents.forEach(event =>
	{
		events[event.id] = {
			name: event.properties.Name.title[0].plain_text,
			tags: event.properties.Tags.multi_select.map(tag => tag.name),
			start: parseISO(event.properties.Date.date.start),
			end: event.properties.Date.date.end ? parseISO(event.properties.Date.date.end) : null,
			notes: event.properties.Notes.rich_text.map(note => note.plain_text).join('\n')
		}

		if (!firstEvent || event.properties.Date.date.start < firstEvent)
		{
			firstEvent = event.properties.Date.date.start
		}

		if (!lastEvent || event.properties.Date.date.end > lastEvent)
		{
			lastEvent = event.properties.Date.date.end
		}
	})

	stakeholders.forEach(({ id, properties }) =>
	{
		people.push({
			uuid: id,
			title: properties?.Title?.rich_text[0]?.plain_text || properties.Name.title[0].plain_text,
			events: properties.Runsheet.relation.map((event: { id: string }) => events[event.id]).sort((a, b) => a.start.getTime() - b.start.getTime())
		})
	})

	return (
		<Schedule
			people={people}
			start={firstEvent}
			end={lastEvent}
		/>
	)
}

export default GuestRunsheets

