import { test } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test.describe("Button Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/button/default");
    await injectAxe(page);
  });

  test("should have no accessibility violations", async ({ page }) => {
    await checkA11y(page);
  });
});
