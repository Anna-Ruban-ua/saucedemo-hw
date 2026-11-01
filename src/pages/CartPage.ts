import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private itemName: Locator = this.page.getByTestId('inventory-item');
  private itemPrice: Locator = this.page.getByTestId('inventory-item-price');
  private checkoutButton: Locator = this.page.getByTestId('checkout');
  private continueShoppingButton: Locator =
    this.page.getByTestId('continue-shopping');

  getPriceByTitle(title: string) {
    return this.getProductByTitle(this.itemName, title).locator(this.itemPrice);
  }

  async removeFromCartByTitle(title: string) {
    await this.getProductByTitle(this.itemName, title)
      .getByRole('button', {
        name: 'Remove',
      })
      .click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
