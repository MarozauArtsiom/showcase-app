import { test, expect } from "@playwright/test";

test.describe("SearchInput visual tests", () => {
    test('should render with default placeholder', async ({ page }) => {
        await page.goto('/search-input/default');
        expect(await page.screenshot()).toMatchSnapshot();
    });

    test("should render combobox with variants", async ({ page }) => {
        await page.goto('/search-input/with-items');
        const input = await page.getByPlaceholder("start typing...");
        input.click();
        input.fill('first');
        expect(await page.screenshot()).toMatchSnapshot();
    });
})