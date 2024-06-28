import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/schedules/guest";

export default async function Schedule() {
	return (
		<>
			<h2 id="schedule">Schedule</h2>
			<p>Note: These times will be local to your current location, so may be different if you're not in Perth.</p>
			<FetchData />
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
