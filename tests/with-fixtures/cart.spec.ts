import { test, expect } from '../fixtures/fixtures';
import { products } from '../../src/constants/products';

test('Cart shows the same price as the catalog', async ({
  productComponent,
  inventoryPage,
}) => {
  const catalogPrice = await productComponent.locators
    .getPriceLocatorByTitle(products[1].title)
    .innerText();
  await productComponent.addToCartByTitle(products[1].title);

  await inventoryPage.openCart();
  await expect(
    productComponent.locators.getPriceLocatorByTitle(products[1].title),
  ).toHaveText(catalogPrice);
});

test('Return from cart to catalog', async ({
  productComponent,
  inventoryPage,
  cartPage,
}) => {
  await productComponent.addToCartByTitle(products[1].title);
  await inventoryPage.openCart();
  await cartPage.continueShopping();

  await expect(inventoryPage.locators.inventoryContainer).toBeVisible();
  await expect(inventoryPage.locators.cartBadge).toHaveCount(1);
});
