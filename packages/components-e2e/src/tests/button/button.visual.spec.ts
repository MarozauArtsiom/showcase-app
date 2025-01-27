import { test, expect } from "@playwright/test";

test.describe("Button visual tests", () => {
  test("should display correct", async ({ page }) => {
    await page.goto('/button/default');
    expect(await page.screenshot()).toMatchSnapshot();
  });
});
