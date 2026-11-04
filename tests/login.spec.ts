import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage/InventoryPage';
import { users, passwords } from '../src/constants/userData';

test('Standard user lands on the catalog after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await page.goto('');
  await loginPage.login({
    userName: users.standard,
    password: passwords.valid,
  });
  await expect(inventoryPage.locators.inventoryContainer).toBeVisible();
});
