// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const path = require('path')

module.exports = async (phase, { defaultConfig }) => {
	const nextConfig = {
		...defaultConfig,
		reactStrictMode: true,
		webpack(config) {
			config.module.rules.push({
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack'],
			})

			return config
		}
	}

	return nextConfig
}