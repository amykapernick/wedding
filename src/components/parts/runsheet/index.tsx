import { RunsheetEvent, Stakeholder } from "@ts/runsheet"
import styles from './styles.module.css'
import { format } from "date-fns-tz"
import Calendar from '@img/icons/calendar.svg'
import { ics } from "calendar-link"
import FrameTop from '@img/frame_top.png'
import Image from 'next/image'

type RunsheetProps = {
	stakeholder: Stakeholder
}

const Runsheet = (props: RunsheetProps) =>
{
	const { stakeholder } = props
	const days: Record<string, RunsheetEvent[]> = {}
	let eventsCount = 0

	stakeholder.events.forEach(event =>
	{
		const day = format(event.start, 'EEEE, dd MMM')
		if (!days[day]) days[day] = []
		days[day].push(event)
	})

	return (
		<article className={styles.runsheet} data-name={stakeholder.name}>
			<h3 className={styles.person}>{stakeholder.name}</h3>
			{Object.entries(days).map(([day, events]) =>
			{
				let newPage = false
				eventsCount += (events.length + 3)

				if (eventsCount > 18)
				{
					newPage = true
					eventsCount = 0
				}

				return (
					<section key={day} data-page={newPage}>
						<Image src={FrameTop} alt="" className="print-only frame" />
						<span className={styles.person_name}>{stakeholder.name}</span>
						<h4 className={styles.day}>{day}</h4>
						<table className={styles.timetable}>
							<thead>
								<tr className="spacing">
									<th colSpan={5}></th>
								</tr>
								<tr>
									<th>Start</th>
									<th>End</th>
									<th>Description</th>
									<th>Notes</th>
									<th className="no-print">Calendar</th>
								</tr>
							</thead>
							<tbody>
								{events.map((event: RunsheetEvent) => (
									<tr key={event.name}>
										<td>{format(event.start, 'h:mm aaa', { timeZone: 'Australia/Perth' })}</td>
										<td>{event?.end && format(event.end, 'hh:mm aaa', { timeZone: 'Australia/Perth' })}</td>
										<td>{event.name}</td>
										<td><small>{event?.notes}</small></td>
										<td className="no-print">
											<a
												download={`${ event.name }.ics`}
												href={ics({
													title: event.name,
													start: event.start.toISOString(),
													end: event.end?.toISOString() ?? event.start.toISOString(),
													description: ""
												})}
												target="_blank"
												className={styles.calendar}
											>
												<Calendar />
												<span className="sr-only">Add to Calendar</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
				)
			})}
		</article>
	)
}

export default Runsheet

