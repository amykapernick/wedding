import type { NotionRelation } from "@ts/people";
import notion from "./notion";

type fetchRunsheetDataProps = {
	guests?: NotionRelation[];
	vendor?: string;
}

const fetchRunsheetData = async (props: fetchRunsheetDataProps) =>
{
	const { guests, vendor } = props;

	let runsheetFilter = undefined
	let stakeholderFilter = undefined
	let stakeholders

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

		stakeholders = await notion.databases.query({
			database_id: process.env.STAKEHOLDER_DB ?? "",
			filter: {
				or: guests?.map((guest) => ({
					property: "Guests",
					relation: {
						contains: guest.id,
					},
				})),
			},
		});
	}
	else if (vendor && vendor === 'all')
	{
		runsheetFilter = {
			property: "Vendor Slugs",
			formula: {
				string: {
					is_not_empty: true,
				},
			},
		}
	}
	else if (vendor)
	{
		runsheetFilter = {
			property: "Vendor Slugs",
			formula: {
				string: {
					contains: vendor,
				},
			},
		}
	}

	const runsheetEvents: any = await notion.databases.query({
		database_id: process.env.RUNSHEET_DB ?? "",
		filter: runsheetFilter as any,
	});

	return ({
		runsheetEvents,
		stakeholders,
	})
}

export default fetchRunsheetData
