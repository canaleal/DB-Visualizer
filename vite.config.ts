/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'json', 'html'],
		},
	}
})

