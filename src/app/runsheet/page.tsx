import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/runsheets/guest";
import PrintButton from "@components/printButton";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Runsheet | Daniel & Amy's Wedding`,
	description: "Printable runsheets for the day",
};

export default async function Runsheet() {
	return (
		<>
			<h1 id="runsheet">Runsheets</h1>
			<p>You can print these off for easy reference.</p>
			<PrintButton>Print Runsheet</PrintButton>
			<FetchData />
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
