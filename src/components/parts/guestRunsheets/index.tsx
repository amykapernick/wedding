import { NotionRunsheetEvent, RunsheetEvent, NotionStakeholder } from "@ts/runsheet"
import Runsheet from "@parts/runsheet"
import { parseISO } from "date-fns"

type GuestRunsheetsProps = {
	runsheetEvents: NotionRunsheetEvent[]
	stakeholders: NotionStakeholder[]
}

const GuestRunsheets = (props: GuestRunsheetsProps) =>
{
	const { runsheetEvents = [], stakeholders = [] } = props
	const events: Record<string, RunsheetEvent> = {}

	runsheetEvents.forEach(event =>
	{
		console.log({ ...event })

		events[event.id] = {
			name: event.properties.Name.title[0].plain_text,
			tags: event.properties.Tags.multi_select.map(tag => tag.name),
			start: parseISO(event.properties.Date.date.start),
			end: event.properties.Date.date.end ? parseISO(event.properties.Date.date.end) : null,
			notes: event.properties.Notes.rich_text.map(note => note.plain_text).join('\n')
		}
	})

	return (
		<>
			{stakeholders?.map(({ id, properties }) => (
				<Runsheet
					key={id}
					stakeholder={{
						name: properties?.Title?.rich_text[0]?.plain_text || properties.Name.title[0].plain_text,
						events: properties.Runsheet.relation.map((event: { id: string }) => events[event.id]).sort((a, b) => a.start.getTime() - b.start.getTime())
					}}
				/>
			))}
		</>
	)
}

export default GuestRunsheets

