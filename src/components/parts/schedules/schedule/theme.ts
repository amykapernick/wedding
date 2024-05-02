import colours from '@styles/config/colours.cjs'

const formatVariables = require('../../../../../utils/formatVariables.cjs')

const themeColours = formatVariables(colours)

const theme = {
	primary: {
		600: themeColours.green,
		900: 'transparent',
	},
	grey: { 300: themeColours.green_light },
	white: themeColours.white,
	green: {
		300: themeColours.green,
	},
	scrollbar: {
		border: themeColours.white,
		thumb: {
			bg: themeColours.green_light,
		},
	},
	gradient: {
		blue: {
			300: themeColours.green,
		},
	},
	text: {
		grey: {
			300: themeColours.green_light,
			500: themeColours.white,
		},
	},
	timeline: {
		divider: {
			bg: themeColours.neutral,
		},
	},
	loader: {
		teal: themeColours.green,
		purple: themeColours.green,
		pink: themeColours.green,
		bg: themeColours.green_light,
	}
};

export default theme