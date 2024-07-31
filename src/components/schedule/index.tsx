"use client";

import type { RunsheetEvent } from "@ts/runsheet";
import styles from "./style.module.css";
import { add, differenceInCalendarDays, format, set } from "date-fns";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Calendar, DateLocalizer, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { accessors, localizer, views, customComponents, dateFormats } from '@utils/setupCalendar'
import Dialog from "@components/dialog";

type ScheduleProps = {
	type: "guest" | "vendor";
	vendor?: string
	events: RunsheetEvent[];
	startDate: Date;
	endDate: Date;
	guests: Record<string, { id: string; name: string }>;
};

type CustomLocalizer = DateLocalizer & { 
	dayRange: number, 
	startOffset: number 
}

const Schedule = (props: ScheduleProps) => {
	const { startDate, endDate, type, vendor } = props;
	const numDays = differenceInCalendarDays(endDate, startDate) !== 1 ? differenceInCalendarDays(endDate, startDate) + 1 : differenceInCalendarDays(endDate, startDate);
	const [events, setEvents] = useState<Event[]>(props?.events ?? [])
	const [view, setView] = useState<View>(views.default)
	const [date, setDate] = useState<Date>(new Date(startDate))
	const eventDate = new Date(process.env.NEXT_PUBLIC_EVENT_START as string)
	const defaultProps = {
		date: date,
		defaultDate: eventDate > new Date() ? eventDate : new Date(),
		view: view,
		components: customComponents,
		min: set(
			startDate, 
			{
				hours: 5,
				minutes: 0,
				seconds: 0,
				milliseconds: 0
			},
		),
		max: set(
			add(
				startDate, 
				{ days: numDays }
			), 
			{ 
				hours: 23, 
				minutes: 59, 
				seconds: 59, 
				milliseconds: 0 
			}
		),
		formats: dateFormats,
		timeslots: 4,
		step: 15,
	}
	const [event, setEvent] = useState<Event | null>(null)
	const selectEvent = (e) => {
		setEvent(e)
		console.log({e})
	}
	const dialogRef = useRef<HTMLDialogElement>(null)
	const calendarFunctions = {
		onView: useCallback((newView: View) => setView(newView), []),
		onNavigate: useCallback((newDate: Date) => setDate(newDate), []),
		getNow: () => defaultProps.defaultDate,
		onSelectEvent: selectEvent
	}
	const guests = Object.values(props?.guests)
		.sort((a, b) => {
			if (a.id === "all") return -1
			if (b.id === "all") return 1
			return 0
		})
		.map(({name}) => (name))
		.filter((guest) => {
			return events.some((event) => event?.guests?.includes(guest))
		})

	useEffect(() => {
		if (props?.events) {
			setEvents(props.events)
		}
	}, [props])

	console.log({vendor})

	return (
		<div 
			className={styles.schedule} 
			style={{ "--days":  numDays > 5 ? 5 : numDays } as CSSProperties} 
			data-type={type}
			data-view={view}
		>
			<div className={styles.legend}>
				<h2>Colour Key</h2>
				{guests.map((guest, i) => (
					<div 
						key={i} 
						className={styles.guest} 
						data-guest={i}
					>
						<span>{guest}</span>
					</div>
				))}
			</div>
			<Calendar
				className={styles.calendar}
				localizer={{
					...localizer,
					dayRange: numDays > 5 ? 5 : numDays,
					startOffset: differenceInCalendarDays(startDate, new Date(process.env.NEXT_PUBLIC_EVENT_START as string)),
				} as CustomLocalizer}
				popup
				events={events.map((event) => ({
					...event,
					guestId: guests.findIndex((guest) => guest === event?.guests?.[0])
				}))}
				views={views.options}
				{...defaultProps}
				{...calendarFunctions}
				{...accessors}
			/>
			{event && 
				<Dialog
					closeModal={() => setEvent(null)}
					dialog={dialogRef}
				>
					<h2 className={styles.title}>{event.title}</h2>
					<p className={styles.times}>
						{format(event.start, 'h:mm aaa')} - {event.end && format(event.end, 'h:mm aaa')}
					</p>
					{event?.notes && <p className={styles.notes}>{event.notes}</p>}
					{event?.guests && <p className={styles.guests}>{event.guests.join(", ")}</p>}
				</Dialog>
			}
		</div>
	);
};

export default Schedule;
