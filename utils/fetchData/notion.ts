import { Client } from "@notionhq/client";

const { NotionToMarkdown } = require('notion-to-md')

const notion = new Client({
	auth: process.env.NOTION_API_KEY,
});

export const notionToMarkdown = new NotionToMarkdown({
	notionClient: notion
})

export default notion