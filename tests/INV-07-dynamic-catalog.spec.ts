import { expect, test } from '../fixture/PageFixture';

test.describe('Inventory and Navigation', () => {
  test('INV-07 Dynamic Catalog navigation', async ({
    authenticatedPageManager,
  }) => {
    const { dynamicCatalogPage, inventoryPage, navigationMenu } =
      authenticatedPageManager;

    await navigationMenu.open();
    await navigationMenu.openDynamicCatalog();
    await expect(navigationMenu.lazyLoadLink).toBeVisible();
    await expect(navigationMenu.spinnerLink).toBeVisible();
    await expect(navigationMenu.sliderLink).toBeVisible();

    await navigationMenu.sliderLink.click();
    await expect(dynamicCatalogPage.heading).toHaveText(
      'Dynamic Catalog - Slider',
    );
    await dynamicCatalogPage
      .sliderProductButton('Sauce Labs Bike Light')
      .click();
    await expect(dynamicCatalogPage.productName).toHaveText(
      'Sauce Labs Bike Light',
    );
    await expect(dynamicCatalogPage.productPrice).toHaveText('$9.99');

    await navigationMenu.open();
    await navigationMenu.goToAllItems();
    await expect(inventoryPage.heading).toBeVisible();
    await expect(inventoryPage.productCards).toHaveCount(6);
  });
});
