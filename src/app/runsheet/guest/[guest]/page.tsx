import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/parts/fetchGuestRunsheet";

type GuestRunsheetProps = {
	params: {
		guest: string
	}
}

export default async function Runsheet (props: Readonly<GuestRunsheetProps>)
{
	const { guest } = props.params

	return (
		<>
			<h2 id="runsheet">Runsheets</h2>
			<p>You can print these off for easy reference.</p>
			<FetchData guest={guest} />
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	)
}