import { BasePage } from '../BasePage';
import { CheckoutStepOnePageLocators } from './CheckoutStepOnePageLocators';

export class CheckoutStepOnePage extends BasePage {
  readonly locators: CheckoutStepOnePageLocators =
    new CheckoutStepOnePageLocators(this.page);

  async fillUserData({
    firstName,
    lastName,
    postalCode,
  }: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    await this.locators.firstName.fill(firstName);
    await this.locators.lastName.fill(lastName);
    await this.locators.postalCode.fill(postalCode);
  }

  async continue() {
    await this.locators.continueButton.click();
  }

  async cancel() {
    await this.locators.cancelButton.click();
  }
}
