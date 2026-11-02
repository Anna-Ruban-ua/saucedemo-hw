import { type Page, Locator } from '@playwright/test';

export class BaseLocator {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}