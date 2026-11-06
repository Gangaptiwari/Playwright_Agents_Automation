import { expect, Locator, Page } from '@playwright/test';

export class NavigationMenu {
  readonly menuContainer: Locator;
  readonly openButton: Locator;
  readonly closeButton: Locator;
  readonly allItemsLink: Locator;
  readonly dynamicCatalogLink: Locator;
  readonly lazyLoadLink: Locator;
  readonly spinnerLink: Locator;
  readonly sliderLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(private readonly page: Page) {
    this.menuContainer = page.locator('.bm-menu-wrap');
    this.openButton = page.locator('#react-burger-menu-btn');
    this.closeButton = page.locator('#react-burger-cross-btn');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.dynamicCatalogLink = page.locator('#dynamic_catalog_sidebar_link');
    this.lazyLoadLink = page.locator('#dynamic_catalog_lazy_load_link');
    this.spinnerLink = page.locator('#dynamic_catalog_spinner_link');
    this.sliderLink = page.locator('#dynamic_catalog_slider_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
  }

  async open(): Promise<void> {
    if ((await this.menuContainer.getAttribute('aria-hidden')) === 'false') {
      await expect(this.menuContainer).toHaveJSProperty('hidden', false);
      await expect(this.allItemsLink).toBeInViewport({ ratio: 1 });
      return;
    }

    await this.openButton.click();
    await expect(this.menuContainer).toHaveAttribute('aria-hidden', 'false');
    await expect(this.menuContainer).toHaveJSProperty('hidden', false);
    await expect(this.allItemsLink).toBeInViewport({ ratio: 1 });
  }

  async close(): Promise<void> {
    if ((await this.menuContainer.getAttribute('aria-hidden')) === 'true') {
      await expect(this.menuContainer).toHaveJSProperty('hidden', true);
      return;
    }

    await this.closeButton.click();
    await expect(this.menuContainer).toHaveAttribute('aria-hidden', 'true');
    await expect(this.menuContainer).toHaveJSProperty('hidden', true);
  }

  async goToAllItems(): Promise<void> {
    await this.allItemsLink.click();
  }

  async openDynamicCatalog(): Promise<void> {
    await this.dynamicCatalogLink.click();
  }
}
