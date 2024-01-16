import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import FetchGuest from "@components/parts/fetchGuest";

export default async function Home ()
{


	return (
		<>
			<SignedIn>
				<FetchGuest />
			</SignedIn>
			<SignedOut>
				<h2 id="rsvp">RSVP</h2>
				<p>If you're not sure which email address to use or don't remember which one you gave us, reach out to Amy or Dan.</p>
				<SignIn />
			</SignedOut>
		</>
	)
}