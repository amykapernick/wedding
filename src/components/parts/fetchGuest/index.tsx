import Guest from "@parts/guest";
import { Client } from '@notionhq/client'
import { currentUser } from '@clerk/nextjs';
import type { NotionPerson, NotionGuest } from "@ts/people";
import type { User } from "@clerk/nextjs/server";
import Content from '@parts/details';
const { NotionToMarkdown } = require("notion-to-md");

const FetchData = async () =>
{
	const { emailAddresses } = await currentUser() as User;
	const notion = new Client({
		auth: process.env.NOTION_API_KEY
	})
	const data = await notion.databases.query({
		database_id: process.env.GUEST_DB ?? '',
		filter: {
			property: 'GokD',
			email: {
				equals: emailAddresses[0].emailAddress.toLowerCase()
			}
		}
	})
	const guest = data.results?.[0] as any as NotionGuest
	const people: any = await notion.databases.query({
		database_id: process.env.PEOPLE_DB ?? '',
		filter: {
			property: 'Guests',
			relation: {
				contains: guest.id
			}
		}
	})
	const n2m = new NotionToMarkdown({
		notionClient: notion
	})
	const pageData = await n2m.pageToMarkdown(process.env.CONTENT_ID ?? '');

	return (
		<>
			<Content data={n2m.toMarkdownString(pageData)?.parent}>
				<Guest
					people={people?.results as NotionPerson[]}
					guest={{
						id: guest?.id,
						name: guest.properties.Name.title[0].plain_text,
						status: guest.properties.Status.status.name
					}}
				/>
			</Content>
		</>
	)
}

export default FetchData