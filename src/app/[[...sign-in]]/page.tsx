import { SignIn, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import FetchGuest from "@components/fetchData/guest";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Daniel & Amy's Wedding`,
	description: "Daniel & Amy are getting married",
};

export default async function Home() {
	return (
		<>
			<SignedIn>
				<FetchGuest />
				<span className="signout">
					<SignOutButton>Log Out</SignOutButton>
				</span>
			</SignedIn>
			<SignedOut>
				<h1 id="rsvp">Login</h1>
				<p>If you're not sure which email address to use or don't remember which one you gave us, reach out to Amy or Dan.</p>
				<SignIn />
			</SignedOut>
		</>
	);
}
