import { SignOutButton } from "@clerk/nextjs";
import FetchData from "@components/parts/fetchGifts";

export default async function Registry ()
{


	return (
		<>
			<h2>Gift Registry</h2>
			<FetchData />
			<span className="signout">
				<SignOutButton>Log Out</SignOutButton>
			</span>
		</>
	)
}