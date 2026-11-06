import { expect, test } from '../fixture/PageFixture';

test.describe('Inventory and Navigation', () => {
  test('INV-04 Add and remove an item from inventory', async ({
    authenticatedPageManager,
  }) => {
    const { inventoryPage } = authenticatedPageManager;
    const backpack = inventoryPage.productCard('Sauce Labs Backpack');

    await backpack.getByRole('button', { name: 'Add to cart' }).click();
    await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await backpack.getByRole('button', { name: 'Remove' }).click();
    await expect(backpack.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveCount(0);

    const remainingAddActions = await inventoryPage.productCards
      .getByRole('button', { name: 'Add to cart' })
      .count();
    expect(remainingAddActions).toBe(6);
  });
});
