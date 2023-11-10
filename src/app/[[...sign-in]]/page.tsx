import Guest from "@parts/guest";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Client } from '@notionhq/client'
import { currentUser } from '@clerk/nextjs';
import RSVPForm from '@parts/rsvpForm';
import { useRef } from 'react';
import Script from 'next/script';
import FetchGuest from "@components/parts/fetchGuest";

export default async function Home ()
{


	return (
		<>
			<SignedIn>
				<FetchGuest />
			</SignedIn>
			<SignedOut>
				<SignIn />
			</SignedOut>
		</>
	)
}