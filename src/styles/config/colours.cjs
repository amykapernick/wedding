const formatVariables = require('../../../utils/formatVariables.cjs');

const colours = {
	background: '#f0eceb',
	purple: '#6d6c8c',
	navy: '#161F38',
	blue: '#389ccd',
	green: '#1a4639',
	green_light: '#aab8a8',
	red: '#ed4c30',
	pink: '#C25A5D',
	yellow: '#fddf00',
	orange: '#fe6b0e',
	white: '#f5f0f0',
	black: '#0e100b',
	neutral: '@black',
}

module.exports = formatVariables(colours)