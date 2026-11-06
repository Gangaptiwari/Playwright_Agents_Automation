import { expect, test } from '../fixture/PageFixture';
import { inventoryTestData } from '../testdata/TestData';

test.describe('Inventory and Navigation', () => {
  test('INV-01 Render complete inventory', async ({ authenticatedPageManager }) => {
    const inventory = authenticatedPageManager.inventoryPage;

    await expect(inventory.heading).toBeVisible();
    await expect(inventory.productCards).toHaveCount(inventoryTestData.products.length);
    await expect(inventory.productNames).toHaveText(
      inventoryTestData.sortOrders.nameAscending,
    );

    const actualNames = await inventory.productNames.allTextContents();
    expect(new Set(actualNames).size).toBe(inventoryTestData.products.length);

    for (const product of inventoryTestData.products) {
      const card = inventory.productCard(product.name);
      await expect(card.locator('.inventory_item_desc')).not.toBeEmpty();
      await expect(card.locator('.inventory_item_price')).toHaveText(product.price);
      await expect(card.locator('img')).toHaveAttribute('alt', product.name);
      await expect(card.locator('.inventory_item_name')).toBeVisible();
      await expect(card.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    }
  });
});
