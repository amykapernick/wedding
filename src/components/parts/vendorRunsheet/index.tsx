import { NotionRunsheetEvent, RunsheetEvent, NotionStakeholder, VendorRunsheetEvent } from "@ts/runsheet"
import Runsheet from "@parts/runsheet"
import { parseISO } from "date-fns"

type VendorRunsheetsProps = {
	runsheetEvents: NotionRunsheetEvent[]
	vendor: string | null
}

const VendorRunsheets = (props: VendorRunsheetsProps) =>
{
	const { runsheetEvents = [] } = props
	const events: Record<string, VendorRunsheetEvent> = {}

	runsheetEvents.forEach(event =>
	{
		events[event.id] = {
			name: event.properties.Name.title[0].plain_text,
			tags: event.properties.Tags.multi_select.map(tag => tag.name),
			start: parseISO(event.properties.Date.date.start),
			end: event.properties.Date.date.end ? parseISO(event.properties.Date.date.end) : null,
			notes: event.properties.Notes.rich_text.map(note => note.plain_text).join('\n'),
			vendors: event.properties['Vendor Slugs'].formula.string?.split(',')
		}
	})

	return (
		<Runsheet
			stakeholder={{
				name: props.vendor ?? "Runsheet",
				events: Object.values(events).sort((a, b) => a.start.getTime() - b.start.getTime())
			}}
		/>
	)
}

export default VendorRunsheets

