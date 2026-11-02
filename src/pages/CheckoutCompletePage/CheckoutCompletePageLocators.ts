import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class CheckoutCompletePageLocators extends BaseLocator {
  readonly completeContainer: Locator = this.page.getByTestId(
    'checkout-complete-container',
  );
}
