import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class ProductComponentLocators extends BaseLocator {
  readonly items: Locator = this.page.getByTestId('inventory-item');
  readonly itemPrice: Locator = this.page.getByTestId('inventory-item-price');

  readonly getProductByTitle = (title: string) =>
    this.items.filter({ hasText: title });

  readonly getPriceLocatorByTitle = (title: string) =>
    this.getProductByTitle(title).locator(this.itemPrice);

  readonly getAddToCartLocatorByProduct = (product: Locator) =>
    product.getByRole('button', { name: 'Add to cart' });

  readonly getRemoveFromCartLocatorByProduct = (product: Locator) =>
    product.getByRole('button', { name: 'Remove' });
}
