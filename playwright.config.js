const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npx serve docs -l 3123',
    port: 3123,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3123',
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
