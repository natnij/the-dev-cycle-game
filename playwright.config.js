import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: /.*e2e\.spec\.js/,
  use: {
    baseURL: 'http://127.0.0.1:4173'
  },
  webServer: {
    command: 'python3 -m http.server 4173',
    port: 4173,
    reuseExistingServer: true,
    timeout: 120000
  }
});