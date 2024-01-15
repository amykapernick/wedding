import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import FetchData from "@components/parts/fetchGifts";

export default async function Registry() {


	return (
		<>
			<SignedIn>
				<h2>Gift Registry</h2>
				<FetchData />
			</SignedIn>
			<SignedOut>
				<h2 id="rsvp">RSVP</h2>
				<p>If you're not sure which email address to use or don't remember which one you gave us, reach out to Amy or Dan.</p>
				<SignIn />
			</SignedOut>
		</>
	)
}