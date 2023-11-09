import Guest from "@parts/guest";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Client } from '@notionhq/client'
import { currentUser } from '@clerk/nextjs';
import RSVPForm from '@parts/rsvpForm';
import { useRef } from 'react';
import Script from 'next/script';

export default async function Home ()
{
	const { emailAddresses } = await currentUser();
	const notion = new Client({
		auth: process.env.NOTION_API_KEY
	})

	const data = await notion.databases.query({
		database_id: process.env.GUEST_DB,
		filter: {
			property: 'GokD',
			email: {
				equals: emailAddresses[0].emailAddress
			}
		}
	})
	const guest = data.results?.[0] || false
	const people = await notion.databases.query({
		database_id: process.env.PEOPLE_DB,
		filter: {
			property: 'Guests',
			relation: {
				contains: guest.id
			}
		}
	})

	return (
		<>
			<SignedIn>
				<Guest
					people={people?.results}
					guest={{
						id: guest?.id,
						name: guest.properties.Name.title[0].plain_text,
						status: guest.properties.Status.status.name
					}}
				/>
			</SignedIn>
			<SignedOut>
				<SignIn />
			</SignedOut>
		</>
	)
}