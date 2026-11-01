import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  readonly completeContainer: Locator = this.page.getByTestId(
    'checkout-complete-container',
  );
}
