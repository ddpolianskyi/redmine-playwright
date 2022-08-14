const { test, expect } = require('@playwright/test');

test('Download link should be selected', async ({ page }) => {
	await page.goto('https://www.redmine.org')
	
	const downloadLink = page.locator('a.download')
	await downloadLink.click()
	await expect(downloadLink).toHaveClass('download selected')
});