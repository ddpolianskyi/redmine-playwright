const { test, expect } = require('@playwright/test');

test('Issues list should have new filter and Feature tracker', async ({ page }) => {
    await page.goto('https://www.redmine.org/projects/redmine/issues')

    const addFilterSelect = page.locator('select#add_filter_select')
    const applyButton = page.locator('a[onclick^="submit"]')
    await addFilterSelect.selectOption({value: 'tracker_id'})

    const trackerFilterOperatorSelect = page.locator('select#operators_tracker_id')
    const trackerFilterValueSelect = page.locator('select#values_tracker_id_1')
    await trackerFilterOperatorSelect.selectOption({value: "="})
    await trackerFilterValueSelect.selectOption({label: "Feature"})
	await applyButton.click()
    let issuesTracker = await page.locator('tr>td.tracker').allInnerTexts();
    for (let i = 0; i < issuesTracker.length; i++) {
        expect(issuesTracker[i]).toBe('Feature')
    }
});