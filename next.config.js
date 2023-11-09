// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const path = require('path')

module.exports = async (phase, { defaultConfig }) => {
	const nextConfig = {
		...defaultConfig,
		reactStrictMode: true
		// webpack: (webpackConfig, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// 	console.log({ webpackConfig })
		// 	webpackConfig.module.rules.push({
		// 		test: /\.pcss$/,
		// 		use: [
		// 			{ // https://github.com/webpack-contrib/postcss-loader#getting-started
		// 				loader: 'postcss-loader',
		// 				options: {
		// 					postcssOptions: {
		// 						config: path.resolve(__dirname, 'config/postcss.config.js')
		// 					}
		// 				}
		// 			},
		// 		],
		// 	})
		// 	return webpackConfig
		// },
	}

	return nextConfig
}