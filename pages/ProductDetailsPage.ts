import { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly image: Locator;
  readonly cartAction: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.name = page.locator('.inventory_details_name');
    this.description = page.locator('.inventory_details_desc');
    this.price = page.locator('.inventory_details_price');
    this.image = page.locator('.inventory_details_img');
    this.cartAction = page.locator(
      '[data-test="add-to-cart"], [data-test="remove"]',
    );
    this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
  }

  async goBackToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
