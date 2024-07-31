import { CalendarEvent } from "@ts/runsheet"
import { format } from "date-fns"
import { ReactNode } from "react"
import styles from "./styles.module.css"

type EventProps = {
	event: CalendarEvent
	children?: ReactNode
}

export const Event = (props: EventProps) => {
	const {start, end, notes, title} = props?.event

	return (
		<>
			<span className={styles.title}>{title}</span>
			<span className={styles.times}>
				{format(start, 'h:mm aaa')} - {end && format(end, 'h:mm aaa')}
			</span>
			{notes && <p className={styles.notes}>{notes}</p>}
		</>
	)
}

export const EventWrapper = (props: EventProps) => {
	const { children, event} = props
	return (
		<div data-guest={event?.guestId} className={styles.event}>
			{children}
		</div>
	)
}