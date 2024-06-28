import Guest from "@components/guest";
import type { NotionPerson } from "@ts/people";
import Content from "@components/details";
import { TrackEvent } from "@components/fathom";
import fetchCurrentGuest from "@utils/fetchData/currentGuest";
import fetchGuestData from "@utils/fetchData/guestData";
import { notionToMarkdown } from "@utils/fetchData/notion";

const statuses = {
	RSVPed: "rsvp",
	Invited: "invited",
	Invitation: "invited",
	"Not Invited": "invited",
	"Save the Date": "invited",
	Declined: "declined",
};

const FetchData = async () => {
	const { guest, email } = await fetchCurrentGuest();

	if (!guest) {
		return (
			<Content data="">
				<section>
					<p>Whoops, something went wrong, let Dan or Amy know so they can confirm the email address is right.</p>
				</section>
			</Content>
		);
	}

	const people: NotionPerson[] = await fetchGuestData(guest.id);
	const pageData = await notionToMarkdown.pageToMarkdown(process.env.CONTENT_ID ?? "");

	return (
		<>
			{email && <TrackEvent name="Signed In" />}
			<Content data={notionToMarkdown.toMarkdownString(pageData)?.parent} guestStatus={statuses[guest.properties.Status.status.name]}>
				<Guest
					people={people}
					guest={{
						id: guest?.id,
						name: guest.properties.Name.title[0].plain_text,
						status: guest.properties.Status.status.name,
					}}
				/>
			</Content>
		</>
	);
};

export default FetchData;
