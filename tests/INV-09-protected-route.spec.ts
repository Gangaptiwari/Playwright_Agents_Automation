import { expect, test } from '../fixture/PageFixture';

test.describe('Inventory and Navigation', () => {
  test('INV-09 Direct inventory access without authentication', async ({
    pageManager,
  }) => {
    const protectedRoutes = [
      '/inventory.html',
      '/cart.html',
      '/checkout-step-one.html',
    ];

    for (const route of protectedRoutes) {
      await pageManager.page.goto(route);

      await expect(pageManager.loginPage.usernameInput).toBeVisible();
      await expect(pageManager.loginPage.passwordInput).toBeVisible();
      await expect(pageManager.loginPage.loginButton).toBeVisible();
      await expect(pageManager.page).toHaveURL(/\/$/);
      await expect(pageManager.inventoryPage.heading).toHaveCount(0);
      await expect(pageManager.cartPage.itemRows).toHaveCount(0);
    }
  });
});
