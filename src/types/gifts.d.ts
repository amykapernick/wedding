export type NotionGift = {
	id: string
	properties: {
		Name: {
			title: {
				plain_text: string
			}[]
		}
		Price: {
			select: {
				name: string
			}
		}
		Quantity: {
			number: number
		}
		Purchased: {
			number: number
		}
		URL: {
			url: string
		}
		Image: {
			files: {
				file: {
					url: string
				}
			}[]
		}
	}
}