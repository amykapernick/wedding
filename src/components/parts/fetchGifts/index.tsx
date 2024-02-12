import { Client } from '@notionhq/client'
import Gift from "@components/parts/gift";
import styles from './styles.module.css'
import type { User } from "@clerk/nextjs/server";
import { currentUser } from '@clerk/nextjs';
import type { NotionGift } from '@ts/gifts'
import { TrackEvent } from '../fathom';

const FetchData = async () =>
{
	const user = await currentUser() as User;
	const notion = new Client({
		auth: process.env.NOTION_API_KEY
	})
	const data: any = await notion.databases.query({
		database_id: process.env.REGISTRY_DB ?? '',
		sorts: [
			{
				property: 'Price',
				direction: 'ascending'
			}
		]
	})

	const gifts: NotionGift[] = data.results

	return (
		<>
			{user && <TrackEvent name="Signed In" />}
			<ul className={styles.gifts}>
				{gifts.map((gift: NotionGift) => (
					<Gift key={gift.id} {...gift} id={user && gift.id} />
				))}
			</ul>
		</>
	)
}

export default FetchData