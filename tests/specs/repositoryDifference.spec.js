const { test, expect } = require('@playwright/test');

test('Issues list should have Confirmed status', async ({ page }) => {
    await page.goto('https://www.redmine.org/projects/redmine/repository')

    const viewDifferenceButton = page.locator('input[type="submit"]')
    await viewDifferenceButton.click()

    let url = await page.url()
    expect(url).toContain('diff')
});