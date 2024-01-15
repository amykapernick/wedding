import Guest from "@parts/guest";
import { Client } from '@notionhq/client'
import { currentUser } from '@clerk/nextjs';
import type { NotionPerson, NotionGuest } from "@ts/people";
import type { User } from "@clerk/nextjs/server";
import Content from '@parts/details';
const { NotionToMarkdown } = require("notion-to-md");

const FetchData = async () =>
{
	const notion = new Client({
		auth: process.env.NOTION_API_KEY
	})
	const gifts: any = await notion.databases.query({
		database_id: process.env.REGISTRY_DB ?? '',
	})

	console.log({ gifts })

	return (
		<>
			<h2>Gifts</h2>
		</>
	)
}

export default FetchData