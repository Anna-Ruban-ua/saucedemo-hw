import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { users, passwords } from '../src/constants/userData';

test('Cart shows the same price as the catalog', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const title = 'Sauce Labs Bolt T-Shirt';

  await page.goto('');
  await loginPage.login(users.standard, passwords.valid);
  const catalogPrice = await inventoryPage.getPriceByTitle(title).innerText();
  await inventoryPage.addToCartByTitle(title);

  await inventoryPage.openCart();
  await expect(cartPage.getPriceByTitle(title)).toHaveText(catalogPrice);
});

test('Return from cart to catalog', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const title = 'Sauce Labs Bike Light';

  await page.goto('');
  await loginPage.login(users.standard, passwords.valid);
  await inventoryPage.addToCartByTitle(title);
  await inventoryPage.openCart();
  await cartPage.continueShopping();

  await expect(inventoryPage.inventoryContainer).toBeVisible();
  await expect(inventoryPage.cartBadge).toHaveCount(1);
});
