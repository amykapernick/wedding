import type { NotionRelation } from "@ts/people";
import { TrackEvent } from "@components/fathom";
import fetchCurrentGuest from "@utils/fetchData/currentGuest";
import fetchRunsheetData from "@utils/fetchData/runsheets";
import fetchGuestData from "@utils/fetchData/guestData";
import formatRunsheet from "@utils/formatRunsheet";
import Schedule from "@components/schedule";
import formatSchedule from "@utils/formatSchedule";

type FetchGuestRunsheetProps = {
	guest?: string | null;
};

const FetchData = async (props: FetchGuestRunsheetProps) => {
	const { guest, email } = await fetchCurrentGuest(props.guest ?? undefined);
	const people = await fetchGuestData(guest?.id);

	const peopleIds = guest?.properties.Guests.relation as NotionRelation[];

	const { runsheetEvents } = await fetchRunsheetData({
		guests: peopleIds,
	});

	let guestData: Record<string, { id: string; name: string }> = {
		all: {
			id: "all",
			name: guest?.properties.Name.title[0].plain_text ?? "",
		},
	};

	people.forEach(({ properties, id }) => {
		guestData[id.replaceAll("-", "")] = {
			id,
			name: properties.Name.title[0].plain_text,
		};
	});

	// console.log({ guestData });

	const scheduleData = formatSchedule({
		type: "guest",
		guests: guestData,
		events: runsheetEvents.results,
		guestName: guest?.properties.Name.title[0].plain_text ?? "",
	});

	return (
		<>
			{email.toLowerCase() && <TrackEvent name="Signed In" />}
			<Schedule {...scheduleData} />
		</>
	);
};

export default FetchData;
