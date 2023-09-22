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
			provider: 'v8',
			reporter: ['lcov'],
			reportsDirectory: 'test/coverage'
		},
		outputFile: 'test/results.xml',
		reporters: ['junit']
	}
});
