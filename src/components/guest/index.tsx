"use client";

import RSVPForm from "@components/rsvpForm";
import { useState } from "react";
import { GuestStatus, Guest as GuestType, NotionPerson } from "@ts/people";

import styles from "./styles.module.css";

const statuses = {
	RSVPed: "rsvp",
	Invited: "invited",
	Invitation: "invited",
	"Not Invited": "invited",
	"Save the Date": "invited",
	Declined: "declined",
};

type GuestProps = {
	people: NotionPerson[];
	guest: GuestType;
};

const Guest = ({ people, guest }: GuestProps) => {
	const [openSection, setOpenSection] = useState(false);
	const status = statuses[guest.status];
	const pastDate = new Date("2024-08-18") <= new Date();
	const rsvpOpen = openSection || pastDate;

	console.log({
		people,
		guest,
		status,
		pastDate,
		rsvpOpen,
	});

	return (
		<section>
			<h1 id="rsvp">RSVP</h1>
			<p className={styles.name}>
				<span>{guest.name}</span>

				{status === "invited" && `We'd love to have you join us`}
				{status === "rsvp" && `We're so excited to have you join us`}
				{status === "declined" && `Sorry you can't make it, we'll miss you!`}
			</p>
			{pastDate && <p>RSVPs have now closed, if you need to update your RSVP please reach out to Dan or Amy.</p>}
			<button className={styles.button} onClick={() => setOpenSection(true)} aria-disabled={rsvpOpen}>
				{status === "invited" ? "RSVP Now" : "Update RSVP"}
			</button>
			<RSVPForm people={people} closeModal={() => setOpenSection(false)} guest={guest} open={openSection} />
		</section>
	);
};

export default Guest;
