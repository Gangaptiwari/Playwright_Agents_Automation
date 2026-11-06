import { expect, test } from '../fixture/PageFixture';

test.describe('Inventory and Navigation', () => {
  test('INV-08 About link navigation', async ({
    authenticatedPageManager,
  }) => {
    const { navigationMenu, page } = authenticatedPageManager;

    await navigationMenu.open();
    await navigationMenu.aboutLink.click();
    await expect(page).toHaveURL(/https:\/\/saucelabs\.com\/?/);
    await page.goBack();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(authenticatedPageManager.inventoryPage.heading).toBeVisible();
  });
});
