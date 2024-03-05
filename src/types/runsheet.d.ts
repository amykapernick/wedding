export type NotionRunsheetEvent = {
	id: string
	properties: {
		Name: {
			title: {
				plain_text: string
			}[]
		}
		Tags: {
			multi_select: {
				name: string
			}[]
		}
		Date: {
			date: {
				start: string
				end: string
			}
		}
		Stakeholders: {
			relation: {
				id: string
			}[]
		}
		Guests: {
			rollup: {
				array: {
					id: string
				}[]
			}
		}
		Notes: {
			rich_text: {
				plain_text: string
			}[]
		}
		'Vendor Slugs': {
			formula: {
				string: string
			}
		}
	}
}

export type RunsheetEvent = {
	name: string;
	tags: string[];
	start: Date;
	end: Date | null;
	notes: string;
}

export type VendorRunsheetEvent = RunsheetEvent & {
	vendors: string[]
}

export type NotionStakeholder = {
	id: string
	properties: {
		Name: {
			title: {
				plain_text: string
			}[]
		}
		Invitations: {
			relation: {
				id: string
			}[]
		}
		Runsheet: {
			relation: {
				id: string
			}[]
		}
		Title: {
			rich_text: {
				plain_text: string
			}[]
		}
	}

}

export type Stakeholder = {
	name: string
	events: RunsheetEvent[]
}