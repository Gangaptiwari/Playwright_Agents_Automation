import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly itemRows: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.itemRows = page.locator('.cart_item');
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.itemPrices = page.locator('.cart_item .inventory_item_price');
  }
}
