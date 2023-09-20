import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [
		imagetools(),
		react()
	],
	build: {
		minify: false
	},
	css: {
		postcss: './config'
	}
});
