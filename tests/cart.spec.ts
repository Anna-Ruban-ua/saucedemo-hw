import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage/InventoryPage';
import { CartPage } from '../src/pages/CartPage/CartPage';
import { ProductComponent } from '../src/pages/Components/ProductComponentPage';
import { users, passwords } from '../src/constants/userData';
import { products } from '../src/constants/products';

test('Cart shows the same price as the catalog', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productComponent = new ProductComponent(page);

  await page.goto('');
  await loginPage.login({
    userName: users.standard,
    password: passwords.valid,
  });
  const catalogPrice = await productComponent.locators
    .getPriceLocatorByTitle(products[1].title)
    .innerText();
  await productComponent.addToCartByTitle(products[1].title);

  await inventoryPage.openCart();
  await expect(
    productComponent.locators.getPriceLocatorByTitle(products[1].title),
  ).toHaveText(catalogPrice);
});

test('Return from cart to catalog', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const productComponent = new ProductComponent(page);

  await page.goto('');
  await loginPage.login({
    userName: users.standard,
    password: passwords.valid,
  });
  await productComponent.addToCartByTitle(products[1].title);
  await inventoryPage.openCart();
  await cartPage.continueShopping();

  await expect(inventoryPage.locators.inventoryContainer).toBeVisible();
  await expect(inventoryPage.locators.cartBadge).toHaveCount(1);
});
