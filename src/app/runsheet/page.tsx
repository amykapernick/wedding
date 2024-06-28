import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/runsheets/guest";
import PrintButton from "@components/printButton";

export default async function Runsheet() {
	return (
		<>
			<h2 id="runsheet">Runsheets</h2>
			<p>You can print these off for easy reference.</p>
			<PrintButton>Print Runsheet</PrintButton>
			<FetchData />
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
