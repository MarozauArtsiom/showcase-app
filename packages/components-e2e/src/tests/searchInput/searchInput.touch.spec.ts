import { test, expect } from "@playwright/test";

test.describe('SearchInput touch', () => {
    test('should input data', async ({page}) => {
        await page.goto('/search-input/default');
        const input = await page.getByPlaceholder("start typing...");
        const inputBox =  await input.boundingBox();

        if (!inputBox) {
            throw new Error("Can not find SearchInput");
        }

        await page.touchscreen.tap(inputBox.x + inputBox.width / 2, inputBox.y + inputBox.height / 2);

        await page.keyboard.type('test');

        expect(await input).toHaveValue('test');
    })
})