import { expect, test } from '../fixture/PageFixture';
import { inventoryTestData } from '../testdata/TestData';

test.describe('Inventory and Navigation', () => {
  test('INV-03 Open product details and return', async ({
    authenticatedPageManager,
  }) => {
    const { inventoryPage, productDetailsPage } = authenticatedPageManager;

    for (const product of inventoryTestData.products) {
      await inventoryPage.openProduct(product.name);

      await expect(productDetailsPage.name).toHaveText(product.name);
      await expect(productDetailsPage.description).not.toBeEmpty();
      await expect(productDetailsPage.price).toHaveText(product.price);
      await expect(productDetailsPage.image).toBeVisible();
      await expect(productDetailsPage.image).toHaveAttribute('alt', product.name);
      await expect(productDetailsPage.cartAction).toHaveText('Add to cart');

      await productDetailsPage.goBackToProducts();
      await expect(inventoryPage.heading).toBeVisible();
      await expect(inventoryPage.productNames).toHaveCount(
        inventoryTestData.products.length,
      );
      await expect(inventoryPage.cartBadge).toHaveCount(0);
    }
  });
});
