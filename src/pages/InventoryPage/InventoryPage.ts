import { BasePage } from '../BasePage';
import { InventoryPageLocators } from './InventoryPageLocators';

export class InventoryPage extends BasePage {
  readonly locators: InventoryPageLocators = new InventoryPageLocators(
    this.page,
  );

  async openCart() {
    await this.locators.cartButton.click();
  }
}
