import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { users, passwords } from '../src/constants/userData';

test('Cart badge follows adding and removing a product', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const title = 'Sauce Labs Backpack';

  await page.goto('');
  await loginPage.login(users.standard, passwords.valid);

  await inventoryPage.addToCartByTitle(title);
  await expect(inventoryPage.cartBadge).toHaveCount(1);

  await inventoryPage.removeFromCartByTitle(title);
  await expect(inventoryPage.cartBadge).toHaveCount(0);
});
