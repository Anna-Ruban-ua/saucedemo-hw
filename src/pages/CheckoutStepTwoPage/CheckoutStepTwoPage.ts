import { BasePage } from '../BasePage';
import { CheckoutStepTwoPageLocators } from './CheckoutStepTwoPageLocators';

export class CheckoutStepTwoPage extends BasePage {
  readonly locators: CheckoutStepTwoPageLocators =
    new CheckoutStepTwoPageLocators(this.page);

  async getItemsTotal() {
    return this.locators.itemTotal.innerText();
  }

  async finish() {
    await this.locators.finishButton.click();
  }

  async cancel() {
    await this.locators.cancelButton.click();
  }
}
