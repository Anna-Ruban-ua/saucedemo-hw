import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
  private items: Locator = this.page.getByTestId('inventory-item');
  private itemPrice: Locator = this.page.getByTestId('inventory-item-price');
  private itemTotal: Locator = this.page.getByTestId('subtotal-label');
  private finishButton: Locator = this.page.getByTestId('finish');
  private cancelButton: Locator = this.page.getByTestId('cancel');

  getPriceByTitle(title: string) {
    return this.getProductByTitle(this.items, title).locator(this.itemPrice);
  }

  getItemsTotal() {
    return this.itemTotal.innerText();
  }

  async finish() {
    await this.finishButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}
