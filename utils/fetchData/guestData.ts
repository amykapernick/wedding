import type { NotionPerson } from "@ts/people";
import notion from "./notion";


const fetchGuestData = async (guestId: string) =>
{
	const data = await notion.databases.query({
		database_id: process.env.PEOPLE_DB ?? "",
		filter: {
			property: "Guests",
			relation: {
				contains: guestId,
			},
		},
	}) as unknown as { results: NotionPerson[] };

	return data?.results
}

export default fetchGuestData