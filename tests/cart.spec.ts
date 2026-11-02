import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage/InventoryPage';
import { CartPage } from '../src/pages/CartPage/CartPage';
import { ProductComponent } from '../src/pages/Components/ProductComponentPage';
import { users, passwords } from '../src/constants/userData';

test('Cart shows the same price as the catalog', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productComponent = new ProductComponent(page);
  const title = 'Sauce Labs Bolt T-Shirt';

  await page.goto('');
  await loginPage.login(users.standard, passwords.valid);
  const catalogPrice = await productComponent.locators
    .getPriceLocatorByTitle(title)
    .innerText();
  await productComponent.addToCartByTitle(title);

  await inventoryPage.openCart();
  await expect(
    productComponent.locators.getPriceLocatorByTitle(title),
  ).toHaveText(catalogPrice);
});

test('Return from cart to catalog', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const productComponent = new ProductComponent(page);
  const title = 'Sauce Labs Bike Light';

  await page.goto('');
  await loginPage.login(users.standard, passwords.valid);
  await productComponent.addToCartByTitle(title);
  await inventoryPage.openCart();
  await cartPage.continueShopping();

  await expect(inventoryPage.locators.inventoryContainer).toBeVisible();
  await expect(inventoryPage.locators.cartBadge).toHaveCount(1);
});
