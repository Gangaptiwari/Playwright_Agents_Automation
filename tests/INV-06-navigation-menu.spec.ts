import { expect, test } from '../fixture/PageFixture';

test.describe('Inventory and Navigation', () => {
  test('INV-06 Navigation menu and All Items', async ({
    authenticatedPageManager,
  }) => {
    const { inventoryPage, navigationMenu } = authenticatedPageManager;

    await inventoryPage
      .productCard('Sauce Labs Backpack')
      .getByRole('button', { name: 'Add to cart' })
      .click();
    await navigationMenu.open();

    await expect(navigationMenu.allItemsLink).toBeVisible();
    await expect(navigationMenu.dynamicCatalogLink).toBeVisible();
    await expect(navigationMenu.aboutLink).toBeVisible();
    await expect(navigationMenu.logoutLink).toBeVisible();
    await expect(navigationMenu.resetAppStateLink).toBeVisible();
    await expect(navigationMenu.closeButton).toBeVisible();

    await navigationMenu.close();
    await expect(navigationMenu.openButton).toBeVisible();
    await navigationMenu.open();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await navigationMenu.goToAllItems();
    await expect(inventoryPage.heading).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
