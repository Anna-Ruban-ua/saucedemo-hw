import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly items: Locator = this.page.getByTestId('inventory-item');
  private itemPrice: Locator = this.page.getByTestId('inventory-item-price');
  readonly inventoryContainer: Locator = this.page.getByTestId(
    'inventory-container',
  );
  private cartButton: Locator = this.page.getByTestId('shopping-cart-link');
  readonly cartBadge: Locator = this.page.getByTestId('shopping-cart-badge');

  getPriceByTitle(title: string) {
    return this.getProductByTitle(this.items, title).locator(this.itemPrice);
  }

  async addToCartByTitle(title: string) {
    await this.getProductByTitle(this.items, title)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeFromCartByTitle(title: string) {
    await this.getProductByTitle(this.items, title)
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async openCart() {
    await this.cartButton.click();
  }
}
