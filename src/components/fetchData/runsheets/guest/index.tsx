import type { NotionRelation } from "@ts/people";
import { TrackEvent } from "@components/fathom";
import fetchCurrentGuest from "@utils/fetchData/currentGuest";
import fetchRunsheetData from "@utils/fetchData/runsheets";
import fetchGuestData from "@utils/fetchData/guestData";
import formatRunsheet from "@utils/formatRunsheet";
import Runsheet from "@components/runsheet";

type FetchGuestRunsheetProps = {
	guest?: string | null;
};

const FetchData = async (props: FetchGuestRunsheetProps) => {
	const { guest, email } = await fetchCurrentGuest(props.guest ?? undefined);
	const people = await fetchGuestData(guest?.id || '');

	const peopleIds = guest?.properties.Guests.relation as NotionRelation[];

	const { runsheetEvents } = await fetchRunsheetData({
		guests: peopleIds,
	});

	const runsheetData = formatRunsheet({
		guestName: guest?.properties.Name.title[0].plain_text || '',
		type: "guest",
		sheets: people.map(({ properties, id }) => ({
			id,
			name: properties.Name.title[0].plain_text,
		})),
		events: runsheetEvents.results,
	});

	return (
		<>
			{email.toLowerCase() && <TrackEvent name="Signed In" />}
			{Object.entries(runsheetData).map(([id, data]) => (
				<Runsheet key={id} {...data} />
			))}
		</>
	);
};

export default FetchData;
