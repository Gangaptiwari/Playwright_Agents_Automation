import { expect, test } from '../fixture/PageFixture';
import { inventoryTestData } from '../testdata/TestData';

test.describe('Inventory and Navigation', () => {
  test('INV-02 Verify all inventory sort modes', async ({
    authenticatedPageManager,
  }) => {
    const inventory = authenticatedPageManager.inventoryPage;
    const sortModes = [
      {
        value: 'az',
        label: 'Name (A to Z)',
        expected: inventoryTestData.sortOrders.nameAscending,
      },
      {
        value: 'za',
        label: 'Name (Z to A)',
        expected: inventoryTestData.sortOrders.nameDescending,
      },
      {
        value: 'lohi',
        label: 'Price (low to high)',
        expected: inventoryTestData.sortOrders.priceAscending,
      },
      {
        value: 'hilo',
        label: 'Price (high to low)',
        expected: inventoryTestData.sortOrders.priceDescending,
      },
    ];

    for (const sortMode of sortModes) {
      await inventory.selectSort(sortMode.value);
      await expect(inventory.sortDropdown).toHaveValue(sortMode.value);
      await expect(inventory.sortDropdown.locator('option:checked')).toHaveText(
        sortMode.label,
      );
      await expect(inventory.productNames).toHaveText(sortMode.expected);
      await expect(inventory.productNames).toHaveCount(inventoryTestData.products.length);
      await expect(inventory.cartBadge).toHaveCount(0);
    }
  });
});
