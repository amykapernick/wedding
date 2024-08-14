import { SignOutButton, SignedIn } from "@clerk/nextjs";
import FetchData from "@components/fetchData/gifts";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Registry | Daniel & Amy's Wedding`,
	description: "Daniel & Amy are getting married",
};

export default async function Registry() {
	return (
		<>
			<h1>Gift Registry</h1>
			<FetchData />
			<SignedIn>
				<span className="signout">
					<SignOutButton>Log Out</SignOutButton>
				</span>
			</SignedIn>
		</>
	);
}
