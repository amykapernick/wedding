import { Client } from "@notionhq/client";
import { currentUser } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/server";
import { TrackEvent } from "@parts/fathom";
import VendorRunsheets from "@components/parts/runsheet/vendor";

type FetchVendorRunsheetProps = {
	vendor: string;
};

const FetchData = async (props: FetchVendorRunsheetProps) => {
	const user = (await currentUser()) as User;
	const notion = new Client({
		auth: process.env.NOTION_API_KEY,
	});
	let filter = undefined;

	if (props.vendor && props.vendor !== "all") {
		filter = {
			property: "Vendor Slugs",
			formula: {
				string: {
					contains: props.vendor,
				},
			},
		};
	}

	const runsheetEvents: any = await notion.databases.query({
		database_id: process.env.RUNSHEET_DB ?? "",
		filter,
	});

	return (
		<>
			{user?.emailAddresses[0].emailAddress.toLowerCase() && <TrackEvent name="Signed In" />}
			<VendorRunsheets runsheetEvents={runsheetEvents?.results} vendor={props.vendor?.replaceAll("_", " ")} />
		</>
	);
};

export default FetchData;
