import { BasePage } from '../BasePage';
import { CartPageLocators } from './CartPageLocators';

export class CartPage extends BasePage {
  readonly locators: CartPageLocators = new CartPageLocators(this.page);

  async checkout() {
    await this.locators.checkoutButton.click();
  }

  async continueShopping() {
    await this.locators.continueShoppingButton.click();
  }
}
