import { Client } from '@notionhq/client'
import { currentUser } from '@clerk/nextjs';
import RSVPForm from '@parts/rsvpForm';



const Guest = async () => {
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
			<RSVPForm people={people?.results} />
		</>
	)
}

export default Guest