import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class CartPageLocators extends BaseLocator {
  readonly checkoutButton: Locator = this.page.getByTestId('checkout');
  readonly continueShoppingButton: Locator =
    this.page.getByTestId('continue-shopping');
}
