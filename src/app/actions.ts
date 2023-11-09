'use server'

import { Client } from '@notionhq/client';

const notionFields = {
	'age': '{"Age": {"rich_text": [{"type": "text", "text": {"content": "{{value}}"}}]}}',
	'attending': '{"Attending":{"select":{"name": "{{value}}"}}}',
	'child': '{"Child": {"checkbox": {{value}}}}',
	'dietary': `{"Dietary Requirements": {"rich_text": [{"type": "text", "text": {"content": "{{value}}"}}]}}`,
	'meal': '{"Meal":{"select":{"name": "{{value}}"}}}',
	'name': `{"Name": {"title": [{"type": "text","text": {"content": "{{value}}"}}]}}`,
}

export async function submit (formData: FormData)
{
	'use server'

	const notion = new Client({
		auth: process.env.NOTION_API_KEY
	})

	const entries = Object.fromEntries(formData.entries())
	const updatedData = {}

	Object.entries(entries).forEach(([key, value]) =>
	{
		const [type, id] = key.split('_')
		let fieldValue = value

		if (!notionFields[type]) return;

		if (!updatedData[id])
		{
			updatedData[id] = {}
		}

		if (type === 'child')
		{
			fieldValue = true
		}

		updatedData[id] = {
			...updatedData[id],
			...JSON.parse(notionFields[type].replace('{{value}}', fieldValue))
		}

	})

	Object.entries(updatedData).forEach(async ([id, properties]) =>
	{
		await notion.pages.update({
			page_id: id,
			properties: {
				...properties
			}
		})
	})

}