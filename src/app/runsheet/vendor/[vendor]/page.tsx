import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/runsheets/vendor";
import PrintButton from "@components/printButton";
import { Metadata } from "next";

type VendorRunsheetProps = {
	params: {
		vendor: string;
	};
};

export const metadata: Metadata = {
	title: `Runsheet | Daniel & Amy's Wedding`,
	description: "Printable runsheets for the day",
};

export default async function Runsheet(props: Readonly<VendorRunsheetProps>) {
	const { vendor } = props.params;

	return (
		<>
			<h1 id="runsheet">Runsheets</h1>
			<p>You can print these off for easy reference.</p>
			<PrintButton>Print Runsheet</PrintButton>
			{vendor ? <FetchData vendor={vendor} /> : <p>Vendor not found</p>}
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
