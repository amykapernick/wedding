import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/schedules/guest";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Schedule | Daniel & Amy's Wedding`,
	description: "Visual schedule for the day",
};

export default async function Schedule() {
	return (
		<>
			<h1 id="schedule">Schedule</h1>
			<p>Note: These times will be local to your current location, so may be different if you're not in Perth.</p>
			<FetchData />
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
