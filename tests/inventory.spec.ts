import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage/InventoryPage';
import { users, passwords } from '../src/constants/userData';
import { ProductComponent } from '../src/pages/Components/ProductComponentPage';

test('Cart badge follows adding and removing a product', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productComponent = new ProductComponent(page);
  const title = 'Sauce Labs Backpack';

  await page.goto('');
  await loginPage.login(users.standard, passwords.valid);

  await productComponent.addToCartByTitle(title);
  await expect(inventoryPage.locators.cartBadge).toHaveCount(1);

  await productComponent.removeFromCartByTitle(title);
  await expect(inventoryPage.locators.cartBadge).toHaveCount(0);
});
