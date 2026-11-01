import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepOnePage extends BasePage {
  private firstName: Locator = this.page.getByTestId('firstName');
  private lastName: Locator = this.page.getByTestId('lastName');
  private postalCode: Locator = this.page.getByTestId('postalCode');
  private continueButton: Locator = this.page.getByTestId('continue');
  private cancelButton: Locator = this.page.getByTestId('cancel');

  async fillFirstName(firstName: string) {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastName.fill(lastName);
  }

  async fillZipCode(postalCode: string) {
    await this.postalCode.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}
