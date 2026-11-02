import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class CheckoutStepOnePageLocators extends BaseLocator {
  readonly firstName: Locator = this.page.getByTestId('firstName');
  readonly lastName: Locator = this.page.getByTestId('lastName');
  readonly postalCode: Locator = this.page.getByTestId('postalCode');
  readonly continueButton: Locator = this.page.getByTestId('continue');
  readonly cancelButton: Locator = this.page.getByTestId('cancel');
}
