import { RunsheetEvent, Stakeholder } from "@ts/runsheet";
import styles from "./styles.module.css";
import { format } from "date-fns";
import Calendar from "@img/icons/calendar.svg";
import { ics } from "calendar-link";
import FrameTop from "@img/frame_top.png";
import Image from "next/image";
import { formatInTimeZone } from "date-fns-tz";

type RunsheetProps = Stakeholder & {};

const Runsheet = (props: RunsheetProps) => {
	const { name, events } = props;
	const days: Record<string, RunsheetEvent[]> = {};
	let eventsCount = 0;
	let newPage = false;

	events.forEach((event) => {
		const day = formatInTimeZone(event.start, "Australia/Perth", "EEEE, dd MMM");
		if (!days[day]) days[day] = [];
		days[day].push({
			...event,
			start: event.start,
			end: event.end ?? null,
		});
	});

	return (
		<article className={styles.runsheet} data-name={name}>
			<h3 className={styles.person}>{name}</h3>
			{Object.entries(days).map(([day, events]) => {
				eventsCount += events.length + 3;

				if (eventsCount > 18) {
					newPage = true;
					eventsCount = 0;
				} else if (newPage && eventsCount !== events.length + 3) {
					newPage = false;
				}

				return (
					<section key={day} data-page={newPage}>
						<Image src={FrameTop} alt="" className="print-only frame" />
						<span className={styles.person_name}>{name}</span>
						<h4 className={styles.day}>{day}</h4>
						<table className={styles.timetable}>
							<thead>
								<tr className="spacing">
									<th colSpan={5} aria-hidden>
										<span className="sr-only" aria-hidden>
											Spacing header
										</span>
									</th>
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
										<td>{formatInTimeZone(event.start, "Australia/Perth", "h:mm aaa")}</td>
										<td>{event?.end && formatInTimeZone(event.end, "Australia/Perth", "h:mm aaa")}</td>
										<td>{event.name}</td>
										<td>
											<small>{event?.notes}</small>
										</td>
										<td className="no-print">
											<a
												download={`${event.name}.ics`}
												href={ics({
													title: event.name,
													start: event.start.toISOString(),
													end: event.end?.toISOString() ?? event.start.toISOString(),
													description: "",
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
				);
			})}
		</article>
	);
};

export default Runsheet;
