const { test, expect } = require('@playwright/test');

test('Issues list should have Confirmed status', async ({ page }) => {
    await page.goto('https://www.redmine.org/projects/redmine/issues')

    const statusFilterOperatorSelect = page.locator('select#operators_status_id')
    const statusFilterValueSelect = page.locator('select#values_status_id_1')
    const applyButton = page.locator('a[onclick^="submit"]')

    await statusFilterOperatorSelect.selectOption({ value: "=" })
    await statusFilterValueSelect.selectOption({ label: "Confirmed" })
    await applyButton.click()

    await page.waitForSelector('tr>td.status')
    let issuesStatus = await page.locator('tr>td.status').allInnerTexts();
    for (let i = 0; i < issuesStatus.length; i++) {
        expect(issuesStatus[i]).toBe('Confirmed')
    }
});