'use server'

import { Client } from '@notionhq/client';
import { Person } from '@ts/people';
import * as Sentry from "@sentry/nextjs";

const notionFields: Record<string, string> = {
	'age': '{"Age": {"rich_text": [{"type": "text", "text": {"content": "{{value}}"}}]}}',
	'firstname': '{"First Name": {"rich_text": [{"type": "text", "text": {"content": "{{value}}"}}]}}',
	'lastname': '{"Last Name": {"rich_text": [{"type": "text", "text": {"content": "{{value}}"}}]}}',
	'attending': '{"Attending":{"select":{"name": "{{value}}"}}}',
	'child': '{"Child": {"checkbox": {{value}}}}',
	'dietary': `{"Dietary Requirements": {"rich_text": [{"type": "text", "text": {"content": "{{value}}"}}]}}`,
	'meal': '{"Meal":{"select":{"name": "{{value}}"}}}',
	'name': `{"Name": {"title": [{"type": "text","text": {"content": "{{value}}"}}]}}`,
	'song': '{"Song": {"rich_text": [{"type": "text", "text": {"content": "{{value}}"}}]}}',
}

export async function submit (guest: string, formData: FormData)
{
	'use server'

	const notion = new Client({
		auth: process.env.NOTION_API_KEY
	})

	const entries = Object.fromEntries(formData.entries())
	const updatedData: Record<string, Person | {}> = {}

	console.log({ entries })

	Object.entries(entries).forEach(([key, value]) =>
	{
		const [type, id] = key.split('_')
		let fieldValue = value as string

		if (!notionFields[type]) return;

		if (!updatedData[id])
		{
			updatedData[id] = {}
		}

		if (type === 'child')
		{
			fieldValue = 'true'
		}

		const fixedValue = fieldValue
			.replace(/\\/g, '\\\\') // Replace backslashes with double backslashes
			.replace(/"/g, '\\"') // Replace double quotes with escaped double quotes
			.replace(/\n/g, '\\n') // Replace newlines with escaped newlines
			.replace(/\r/g, '\\r') // Replace carriage returns with escaped carriage returns
			.replace(/\t/g, '\\t') // Replace tabs with escaped tabs
			.replace(/[\x00-\x1f]/g, ch => `\\u${ ch.charCodeAt(0).toString(16).padStart(4, '0') }`); // Replace control characters with their escaped unicode representation

		const fieldData = notionFields[type].replace('{{value}}', fixedValue)

		console.log({ fieldData, fixedValue })

		updatedData[id] = {
			...updatedData[id],
			...JSON.parse(fieldData)
		}

	})

	for (const [id, properties] of Object.entries(updatedData))
	{
		await notion.pages.update({
			page_id: id,
			properties: {
				...properties as any
			}
		})

	}

	await notion.pages.update({
		page_id: guest,
		properties: {
			Status: {
				status: {
					name: 'RSVPed'
				}
			}
		}
	})
		.then((res) =>
		{
			console.log({ res })

			return res
		})
		.catch(err =>
		{
			console.log({ err })

			Sentry.captureException(err)

			return err
		})

}

export async function updateGift (gift: string, purchased: number)
{
	'use server'

	const notion = new Client({
		auth: process.env.NOTION_API_KEY
	})

	await notion.pages.update({
		page_id: gift,
		properties: {
			Purchased: {
				number: purchased
			}
		}
	})
		.then((res) =>
		{
			console.log({ res })

			return res
		})
		.catch(err =>
		{
			console.log({ err })

			Sentry.captureException(err)

			return err
		})
}