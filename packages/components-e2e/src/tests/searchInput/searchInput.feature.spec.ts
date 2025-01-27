import { test, expect } from "@playwright/test";

async function getSearchInputOptionsCount(page) {
    return await page.locator('.cc-searchinput-option').count()
}

test.describe('SearchInput feature tests', () => {
    test('should filter combobox items depending on input', async ({ page }) => {
        await page.goto('/search-input/with-items');
        const input = await page.getByPlaceholder("start typing...");
        await input.click();

        await input.fill('first');
        expect(await getSearchInputOptionsCount(page)).toBe(1);

        await input.fill('');
        expect(await getSearchInputOptionsCount(page)).toBe(3);

        await page.locator('.cc-searchinput-option').nth(1).click();
        expect(input).toHaveValue('two');
    });
})