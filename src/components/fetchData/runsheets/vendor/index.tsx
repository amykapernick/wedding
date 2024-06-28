import { TrackEvent } from "@components/fathom";
import fetchCurrentGuest from "@utils/fetchData/currentGuest";
import fetchRunsheetData from "@utils/fetchData/runsheets";
import formatRunsheet from "@utils/formatRunsheet";
import Runsheet from "@components/runsheet";

type FetchVendorRunsheetProps = {
	vendor: string;
};

const FetchData = async (props: FetchVendorRunsheetProps) => {
	const { vendor } = props;
	const { email } = await fetchCurrentGuest();

	const { runsheetEvents } = await fetchRunsheetData({
		vendor: vendor,
	});

	const runsheetData = formatRunsheet({
		guestName: vendor === "all" ? "Runsheet" : vendor.replaceAll("_", " "),
		type: "vendor",
		sheets: [
			{
				id: vendor,
				name: vendor === "all" ? "Runsheet" : vendor.replaceAll("_", " "),
			},
		],
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
