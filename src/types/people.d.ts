export type GuestStatus = 'RSVPed' | 'Invited' | 'Not Invited' | 'Save the Date' | 'Declined'

export type MealOptions = 'Vegetarian' | 'Fish' | 'Steak'

export type PersonDefaults = {
	id: string
	name: string
	attending: 'Yes' | 'No'
	dietary: string
}

export type Adult = PersonDefaults & {
	meal: MealOptions
	child?: false
}

export type Child = PersonDefaults & {
	child: true
	age: number
}

export type Person = Adult | Child

export type NotionPerson = {
	id: string
	properties: {
		Name: {
			title: {
				plain_text: string
			}[]
		}
		Attending: {
			select: {
				name: 'Yes' | 'No'
			}
		}
		'Dietary Requirements': {
			rich_text: {
				type: 'text'
				text: {
					content: string
				}
			}[]
		}
		Meal: {
			select: {
				name: MealOptions
			}
		}
		Child: {
			checkbox: boolean
		}
		Age: {
			rich_text: {
				plain_text: string
			}[]
		}
	}
}

export type NotionGuest = {
	id: string
	properties: {
		Name: {
			title: {
				type: 'text'
				plain_text: string
			}[]
		}
		Status: {
			status: {
				name: GuestStatus
			}
		}
	}
}

export type Guest = {
	id: string
	name: string
	status: GuestStatus
}