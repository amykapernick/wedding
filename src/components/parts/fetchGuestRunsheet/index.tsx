import { Client } from '@notionhq/client'
import { currentUser } from '@clerk/nextjs';
import type { NotionGuest } from "@ts/people";
import type { User } from "@clerk/nextjs/server";
import { TrackEvent } from "@parts/fathom";
import GuestRunsheets from "@parts/guestRunsheets";
import { NotionStakeholder } from '@ts/runsheet';

type FetchGuestRunsheetProps = {
	guest?: string | null
}

const FetchData = async (props: FetchGuestRunsheetProps) =>
{
	const { emailAddresses } = await currentUser() as User;
	const notion = new Client({
		auth: process.env.NOTION_API_KEY
	})

	let filter: any = {
		property: 'GokD',
		email: {
			equals: emailAddresses[0].emailAddress.toLowerCase()
		}
	}

	if (props.guest)
	{
		filter = {
			property: 'ID',
			formula: {
				string: {
					equals: props.guest
				}
			}
		}
	}


	const data = await notion.databases.query({
		database_id: process.env.GUEST_DB ?? '',
		filter
	})
	const guest = data.results?.[0] as unknown as NotionGuest
	const runsheetEvents: any = await notion.databases.query({
		database_id: process.env.RUNSHEET_DB ?? '',
		filter: {
			property: 'Guests',
			rollup: {
				any: {
					relation: {
						contains: guest.id
					}
				}
			}
		}
	})
	const stakeholders = await notion.databases.query({
		database_id: process.env.STAKEHOLDER_DB ?? '',
		filter: {
			property: 'Invitations',
			relation: {
				contains: guest.id
			}
		}
	})

	return (
		<>
			{emailAddresses[0].emailAddress.toLowerCase() && <TrackEvent name="Signed In" />}
			<GuestRunsheets
				runsheetEvents={runsheetEvents?.results}
				stakeholders={stakeholders?.results as any as NotionStakeholder[]}
			/>
		</>
	)
}

export default FetchData