import { test } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test.describe("SearchInput Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/search-input/default");
    await injectAxe(page);
  });

  test("should have no accessibility violations", async ({ page }) => {
    await checkA11y(page);
  });
});
