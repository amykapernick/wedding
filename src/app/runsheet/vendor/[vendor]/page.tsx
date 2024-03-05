import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/parts/fetchRunsheet";

export default async function Runsheet (props)
{
	const { vendor } = props.params

	return (
		<>
			<h2 id="runsheet">Runsheets</h2>
			<p>You can print these off for easy reference.</p>
			<FetchData vendor={vendor} />
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	)
}