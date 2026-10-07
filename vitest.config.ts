/** Discover browser-independent unit tests separately from Playwright checks. */
import { defineConfig } from 'vitest/config';

export default defineConfig({ test: { environment: 'node', include: ['tests/unit/**/*.test.ts'] } });
