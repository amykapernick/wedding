import { Client } from "@notionhq/client";
import { currentUser } from "@clerk/nextjs/server";
import type { NotionGuest, NotionRelation } from "@ts/people";
import type { User } from "@clerk/nextjs/server";
import { TrackEvent } from "@parts/fathom";
import GuestRunsheets from "@components/parts/runsheet/guest";
import { NotionStakeholder } from "@ts/runsheet";
import notion from "./notion";

type fetchRunsheetDataProps = {
	guests?: NotionRelation[];
}

const fetchRunsheetData = async (props: fetchRunsheetDataProps) =>
{
	const { guests } = props;

	let runsheetFilter = undefined
	let stakeholderFilter = undefined

	if (guests)
	{
		runsheetFilter = {
			or: guests?.map((guest) => ({
				property: "Guests",
				rollup: {
					any: {
						relation: {
							contains: guest.id,
						},
					},
				},
			})),
		}

		stakeholderFilter = {
			or: guests?.map((guest) => ({
				property: "Guests",
				relation: {
					contains: guest.id,
				},
			})),
		}
	}

	const runsheetEvents: any = await notion.databases.query({
		database_id: process.env.RUNSHEET_DB ?? "",
		filter: runsheetFilter,
	});

	const stakeholders = await notion.databases.query({
		database_id: process.env.STAKEHOLDER_DB ?? "",
		filter: stakeholderFilter,
	});

	return ({
		runsheetEvents,
		stakeholders,
	})
}

export default fetchRunsheetData
