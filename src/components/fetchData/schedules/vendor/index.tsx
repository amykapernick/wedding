import { TrackEvent } from "@components/fathom";
import fetchCurrentGuest from "@utils/fetchData/currentGuest";
import fetchRunsheetData from "@utils/fetchData/runsheets";
import Schedule from "@components/schedule";
import formatSchedule from "@utils/formatSchedule";

type FetchGuestRunsheetProps = {
	vendor: string;
};

const FetchData = async (props: FetchGuestRunsheetProps) => {
	const { vendor } = props;
	const { email } = await fetchCurrentGuest();

	const { runsheetEvents } = await fetchRunsheetData({
		vendor: vendor,
	});

	const scheduleData = formatSchedule({
		type: "vendor",
		guests: {
			all: {
				id: vendor,
				name: vendor === "all" ? "Runsheet" : vendor.replaceAll("_", " "),
			},
		},
		events: runsheetEvents.results,
		guestName: vendor === "all" ? "Runsheet" : vendor.replaceAll("_", " "),
	});

	return (
		<>
			{email.toLowerCase() && <TrackEvent name="Signed In" />}
			<Schedule {...scheduleData} vendor={vendor} />
		</>
	);
};

export default FetchData;
