import { expect, test } from '../fixture/PageFixture';

test.describe('Inventory and Navigation', () => {
  test('INV-05 Add item from detail page', async ({
    authenticatedPageManager,
  }) => {
    const { inventoryPage, productDetailsPage, cartPage } =
      authenticatedPageManager;
    const productName = 'Sauce Labs Bike Light';

    await inventoryPage.openProduct(productName);
    await productDetailsPage.cartAction.click();
    await expect(productDetailsPage.cartAction).toHaveText('Remove');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await productDetailsPage.goBackToProducts();
    await expect(
      inventoryPage
        .productCard(productName)
        .getByRole('button', { name: 'Remove' }),
    ).toBeVisible();
    await inventoryPage.openCart();

    await expect(cartPage.itemRows).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText([productName]);
    await expect(cartPage.itemPrices).toHaveText(['$9.99']);
  });
});
