import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/fetchData/schedules/vendor";

type VendorScheduleProps = {
	params: {
		vendor: string;
	};
};

export default async function Schedule(props: Readonly<VendorScheduleProps>) {
	const { vendor } = props.params;

	return (
		<>
			<h2 id="schedule">Schedule</h2>
			<p>Note: These times will be local to your current location, so may be different if you're not in Perth.</p>
			{vendor ? <FetchData vendor={vendor} /> : <p>Vendor not found</p>}
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	);
}
