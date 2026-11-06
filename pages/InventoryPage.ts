import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly heading: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByText('Products', { exact: true });
    this.productCards = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('.product_sort_container');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  productCard(name: string): Locator {
    return this.productCards.filter({
      has: this.page.locator('.inventory_item_name', { hasText: name }),
    });
  }

  async openProduct(name: string): Promise<void> {
    await this.productCard(name).locator('.inventory_item_name').click();
  }

  async selectSort(mode: string): Promise<void> {
    await this.sortDropdown.selectOption(mode);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
