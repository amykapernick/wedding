import { currentUser } from "@clerk/nextjs/server";
import type { NotionGuest } from "@ts/people";
import type { User } from "@clerk/nextjs/server";
import { captureException, getReplay } from "@sentry/nextjs";
import notion from './notion'

const fetchCurrentGuest = async (guestId?: string) =>
{
	const replay = getReplay();

	if (replay)
	{
		replay.start()
	}

	const { emailAddresses } = (await currentUser()) as User;

	let filter: any = {
		property: "GokD",
		email: {
			equals: emailAddresses[0].emailAddress.toLowerCase(),
		},
	}

	if (guestId)
	{
		filter = {
			property: "ID",
			formula: {
				string: {
					equals: guestId,
				},
			},
		};
	}

	const data = await notion.databases.query({
		database_id: process.env.GUEST_DB ?? "",
		filter,
	}) as unknown as { results: NotionGuest[] };

	const guest = data.results?.[0] as NotionGuest;
	const email = emailAddresses[0].emailAddress.toLowerCase()

	if (!guest)
	{
		console.log({ emailAddresses, data, guestId });
		captureException(
			new Error(
				`Guest not found: ${ email }`
			)
		);
	}

	return ({
		guest,
		email,
	})
}

export default fetchCurrentGuest