import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/schedules/guest";

export default async function Runsheet() {
	return (
		<>
			<h2 id="runsheet">Schedule</h2>
			<FetchData />
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
