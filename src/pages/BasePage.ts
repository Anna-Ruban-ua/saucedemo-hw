import { type Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected getProductByTitle(items: Locator, title: string) {
    return items.filter({ hasText: title });
  }
}
