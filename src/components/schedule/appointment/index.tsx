import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { RunsheetEvent } from "@ts/runsheet";
import { type ReactNode, type CSSProperties, useState, useEffect, useRef } from "react";
import styles from "../style.module.css";

type Guest = {
	name: string;
	id: string;
};

type AppointmentProps = Appointments.AppointmentProps & {
	children: ReactNode;
	style: CSSProperties;
	data: RunsheetEvent & {
		guests: Guest[];
	};
};

const AppointmentContent = (props: AppointmentProps) => {
	const { children, data } = props;
	const { guests, notes } = data;

	return (
		<>
			{children}
			<span className={styles.guest}>{guests.map(({ name }: Guest) => name).join(", ")}</span>
			<p>{notes}</p>
		</>
	);
};

const Appointment = (props: AppointmentProps) => {
	const { children, style, data, ...restProps } = props;
	const [openDialog, setOpenDialog] = useState(false);
	const dialogRef = useRef(null);

	useEffect(() => {
		const dialog: any = dialogRef?.current;

		if (dialog) {
			if (openDialog) dialog.showModal();
			else dialog.close();
		}
	}, [openDialog]);

	return (
		<Appointments.Appointment {...restProps} data={data} className={styles.appointment}>
			<AppointmentContent {...props} />
			<button className={styles.open} onClick={() => setOpenDialog(true)}>
				<span className="sr-only">Open Details</span>
			</button>
			<dialog ref={dialogRef} className={styles.dialog}>
				<button className={styles.close} onClick={() => setOpenDialog(false)}>
					✕<span className="sr-only">Close</span>
				</button>
				<AppointmentContent {...props} />
			</dialog>
		</Appointments.Appointment>
	);
};

export default Appointment;
