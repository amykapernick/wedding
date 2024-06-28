import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/runsheets/vendor";
import PrintButton from "@components/printButton";

type VendorRunsheetProps = {
	params: {
		vendor: string;
	};
};

export default async function Runsheet(props: Readonly<VendorRunsheetProps>) {
	const { vendor } = props.params;

	return (
		<>
			<h2 id="runsheet">Runsheets</h2>
			<p>You can print these off for easy reference.</p>
			<PrintButton>Print Runsheet</PrintButton>
			{vendor ? <FetchData vendor={vendor} /> : <p>Vendor not found</p>}
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
