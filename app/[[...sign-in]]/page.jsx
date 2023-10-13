import Guest from "@parts/guest";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";



const Home = () => {
	return (
		<>
			<SignedIn>
				<Guest />
			</SignedIn>
			<SignedOut>
				<SignIn />
			</SignedOut>
		</>
	)
}

export default Home