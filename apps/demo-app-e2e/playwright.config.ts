import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';
const isCI = process.env['CI'] === 'true';

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  use: {
    baseURL,
    trace: isCI ? 'on-first-retry' : 'off',
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },
  webServer: {
    command: 'npx nx serve demo-app --port=4200',
    url: 'http://localhost:4200',
    reuseExistingServer: !isCI,
    timeout: 180000,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
