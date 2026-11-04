import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage/InventoryPage';
import { users, passwords } from '../src/constants/userData';
import { ProductComponent } from '../src/pages/Components/ProductComponentPage';
import { products } from '../src/constants/products';

test('Cart badge follows adding and removing a product', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productComponent = new ProductComponent(page);

  await page.goto('');
  await loginPage.login({
    userName: users.standard,
    password: passwords.valid,
  });

  await productComponent.addToCartByTitle(products[3].title);
  await expect(inventoryPage.locators.cartBadge).toHaveCount(1);

  await productComponent.removeFromCartByTitle(products[3].title);
  await expect(inventoryPage.locators.cartBadge).toHaveCount(0);
});
