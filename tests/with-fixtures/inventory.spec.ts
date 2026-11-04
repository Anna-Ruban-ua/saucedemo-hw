import { test, expect } from '../fixtures/fixtures';
import { products } from '../../src/constants/products';

test('Cart badge follows adding and removing a product', async ({
  productComponent,
  inventoryPage,
}) => {
  await productComponent.addToCartByTitle(products[3].title);
  await expect(inventoryPage.locators.cartBadge).toHaveCount(1);

  await productComponent.removeFromCartByTitle(products[3].title);
  await expect(inventoryPage.locators.cartBadge).toHaveCount(0);
});
