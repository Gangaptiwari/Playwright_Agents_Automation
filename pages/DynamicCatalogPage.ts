import { Locator, Page } from '@playwright/test';

export class DynamicCatalogPage {
  readonly heading: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.locator('.title');
    this.productName = page.locator('.dynamic_catalog_card_name');
    this.productPrice = page.locator('.dynamic_catalog_card_price');
  }

  sliderProductButton(name: string): Locator {
    return this.page.getByRole('button', { name: `Show ${name}` });
  }
}
