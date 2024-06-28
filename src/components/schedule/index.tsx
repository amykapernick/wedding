"use client";

import { Scheduler, WeekView, Appointments } from "@devexpress/dx-react-scheduler-material-ui";

const Schedule = () => {
	return (
		<Scheduler>
			<WeekView startDayHour={6} endDayHour={24} cellDuration={60} name="week" />
			<Appointments />
		</Scheduler>
	);
};

export default Schedule;
