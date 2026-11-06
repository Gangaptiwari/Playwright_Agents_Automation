import { test, expect } from '../fixture/PageFixture';

interface AuthenticationTestData {
  standardUser: {
    username: string;
    password: string;
  };
  expectedInventory: string[];
}

const testData = require('../testdata/authentication.json') as AuthenticationTestData;

test.describe('Authentication and Session', () => {
  test('AUTH-01 Login with standard user', async ({ pageManager }) => {
    // 1. Start fresh at SauceDemo, sign in as standard_user, and verify the inventory and empty cart.
    await pageManager.loginPage.goto();
    await pageManager.loginPage.login(
      testData.standardUser.username,
      testData.standardUser.password,
    );

    await expect(pageManager.page).toHaveURL(/\/inventory\.html$/);
    await expect(pageManager.inventoryPage.heading).toHaveText('Products');
    await expect(pageManager.inventoryPage.productNames).toHaveCount(
      testData.expectedInventory.length,
    );
    await expect(pageManager.inventoryPage.productNames).toHaveText(
      testData.expectedInventory,
    );
    await expect(pageManager.inventoryPage.cartBadge).toHaveCount(0);
    await expect(pageManager.loginPage.errorMessage).toHaveCount(0);
  });
});