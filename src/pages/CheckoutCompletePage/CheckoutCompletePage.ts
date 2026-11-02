import { BasePage } from '../BasePage';
import { CheckoutCompletePageLocators } from './CheckoutCompletePageLocators';

export class CheckoutCompletePage extends BasePage {
  readonly locators: CheckoutCompletePageLocators =
    new CheckoutCompletePageLocators(this.page);
}
