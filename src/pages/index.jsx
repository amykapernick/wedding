import RSVPForm from "../components/parts/rsvpForm";
import { ClerkProvider, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const people = {
	adults: [
	  {
		name: "Bec",
	  },
	  {
		name: "Wilson",
	  },
	],
	children: [
	  {
		name: "Peter",
	  },
	  {
		name: "Clair",
	  },
	],
  };

const Home = () => {
	return (
		<>
			<SignedIn>
				<RSVPForm people={people} />
			</SignedIn>
			<SignedOut>
				<SignIn />
			</SignedOut>
		</>
	)
}

export default Home