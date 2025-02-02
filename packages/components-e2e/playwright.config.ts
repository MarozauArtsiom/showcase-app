import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5174',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium::a11y',
      testMatch: [
        '**/*.a11y.spec.ts',
      ],
      use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 720 } },
    },
    {
      name: 'chromium::feature',
      testMatch: [
        '**/*.feature.spec.ts',
      ],
      use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 720 } },
    },
    {
      name: 'chromium::visual',
      testMatch: [
        '**/*.visual.spec.ts'
      ],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 720 },
      },
    },
    {
      name: 'chromium::touch',
      testMatch: '**/*.touch.spec.ts',
      use: {
        ...devices['Pixel 8'],
        viewport: { width: 800, height: 600 },
        hasTouch: true,
      },
    },
  ],

  expect: {
    toMatchSnapshot: { maxDiffPixels: 100 },
    toHaveScreenshot: { maxDiffPixels: 100 },
  }

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
