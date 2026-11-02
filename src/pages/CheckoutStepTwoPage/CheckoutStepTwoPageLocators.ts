import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class CheckoutStepTwoPageLocators extends BaseLocator {
  readonly itemTotal: Locator = this.page.getByTestId('subtotal-label');
  readonly finishButton: Locator = this.page.getByTestId('finish');
  readonly cancelButton: Locator = this.page.getByTestId('cancel');
}
