import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class InventoryPageLocators extends BaseLocator {
  readonly inventoryContainer: Locator = this.page.getByTestId(
    'inventory-container',
  );
  readonly cartButton: Locator = this.page.getByTestId('shopping-cart-link');
  readonly cartBadge: Locator = this.page.getByTestId('shopping-cart-badge');
}
