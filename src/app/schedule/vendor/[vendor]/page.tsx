import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/schedules/vendor";
import { Metadata } from "next";

type VendorScheduleProps = {
	params: {
		vendor: string;
	};
};

export const metadata: Metadata = {
	title: `Schedule | Daniel & Amy's Wedding`,
	description: "Visual schedule for the day",
};

export default async function Schedule(props: Readonly<VendorScheduleProps>) {
	const { vendor } = props.params;

	return (
		<>
			<h1 id="schedule">Schedule</h1>
			<p>Note: These times will be local to your current location, so may be different if you're not in Perth.</p>
			{vendor ? <FetchData vendor={vendor} /> : <p>Vendor not found</p>}
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
