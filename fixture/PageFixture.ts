import { test as base, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
import { authenticationTestData } from '../testdata/TestData';

type Fixtures = {
  pageManager: PageManager;
  authenticatedPageManager: PageManager;
};

export const test = base.extend<Fixtures>({
  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },
  authenticatedPageManager: async ({ pageManager }, use) => {
    await pageManager.loginPage.goto();
    await pageManager.loginPage.login(
      authenticationTestData.standardUser.username,
      authenticationTestData.standardUser.password,
    );
    await use(pageManager);
  },
});

export { expect };
