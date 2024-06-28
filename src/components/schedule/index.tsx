"use client";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import type { RunsheetEvent } from "@ts/runsheet";
import styles from "./style.module.css";
import { differenceInCalendarDays } from "date-fns";
import Appointment from "./appointment";

type ScheduleProps = {
	events: RunsheetEvent[];
	startDate: Date;
	endDate: Date;
	guests: Record<string, { id: string; name: string }>;
};

const Schedule = (props: ScheduleProps) => {
	const { events, startDate, endDate, guests } = props;
	const guestIndex = Object.values(guests).map((guest, i) => ({
		...guest,
		index: i,
	}));
	const days = differenceInCalendarDays(endDate, startDate) > 1 ? differenceInCalendarDays(endDate, startDate) + 1 : differenceInCalendarDays(endDate, startDate);

	return (
		<div className={styles.schedule} style={{ "--days": days }}>
			<Scheduler
				data={
					events.map((event) => ({
						title: event.name,
						startDate: event.start,
						endDate: event.end,
						notes: event.notes,
						guests: guestIndex.filter(({ name }) => event.guests.includes(name)),
					})) as any
				}
			>
				<ViewState currentDate={startDate} />
				<DayView startDayHour={6} endDayHour={24} cellDuration={60} intervalCount={days} />
				<Appointments appointmentComponent={Appointment} />
			</Scheduler>
		</div>
	);
};

export default Schedule;
