import { Page } from '@playwright/test';
import { CartPage } from './CartPage';
import { DynamicCatalogPage } from './DynamicCatalogPage';
import { InventoryPage } from './InventoryPage';
import { LoginPage } from './LoginPage';
import { NavigationMenu } from './NavigationMenu';
import { ProductDetailsPage } from './ProductDetailsPage';

export class PageManager {
  readonly loginPage: LoginPage;
  readonly inventoryPage: InventoryPage;
  readonly productDetailsPage: ProductDetailsPage;
  readonly cartPage: CartPage;
  readonly navigationMenu: NavigationMenu;
  readonly dynamicCatalogPage: DynamicCatalogPage;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.inventoryPage = new InventoryPage(page);
    this.productDetailsPage = new ProductDetailsPage(page);
    this.cartPage = new CartPage(page);
    this.navigationMenu = new NavigationMenu(page);
    this.dynamicCatalogPage = new DynamicCatalogPage(page);
  }
}
