import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/schedules/guest";

type GuestScheduleProps = {
	params: {
		guest: string;
	};
};

export default async function Schedule(props: Readonly<GuestScheduleProps>) {
	const { guest } = props.params;

	return (
		<>
			<h2 id="schedule">Schedule</h2>
			<p>Note: These times will be local to your current location, so may be different if you're not in Perth.</p>
			<FetchData guest={guest} />
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
