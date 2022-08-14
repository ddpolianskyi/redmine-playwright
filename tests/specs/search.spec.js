const { test, expect } = require('@playwright/test');

test('Search should show issues with titles containing "webdriver"', async ({ page }) => {
    await page.goto('https://www.redmine.org')

    const searchInput = page.locator('div#quick-search input#q')
    await searchInput.fill('webdriver')
    await page.keyboard.press('Enter')
    await page.waitForSelector('input#titles_only')

    const searchOnlyTitlesFilter = page.locator('input#titles_only')
    const searchIssuesFilter = page.locator('p#search-types input[name="issues"]')
    const submitButton = page.locator('input[type="submit"]')
    await searchOnlyTitlesFilter.check()
    await searchIssuesFilter.check()
    await submitButton.click()
    await page.waitForSelector('dl#search-results dt')
    const searchResults = await page.$$('dl#search-results dt')
    if (searchResults.length === 0) {}
    else {
        const searchResultsHighlights = await page.locator('dl#search-results>dt span').allInnerTexts()
        for (let i = 0; i < searchResultsHighlights.length; i++) {
            expect(searchResultsHighlights[i].toLowerCase()).toBe('webdriver')
        }
    }
})