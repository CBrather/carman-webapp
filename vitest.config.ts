/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			all: true,
			enabled: true,
			include: ['src/**/*.{js,jsx,ts,tsx}'],
			exclude: ['src/**/*.test.{js,jsx,ts,tsx}', '**/test/**/*'],
			provider: 'v8',
			reporter: ['lcov'],
			reportsDirectory: 'test/coverage'
		},
		outputFile: 'test/results.xml',
		reporters: ['default', 'junit'],
		setupFiles: ['src/test/setup/setup.ts']
	}
});
