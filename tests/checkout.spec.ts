import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutStepOnePage } from '../src/pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../src/pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage';

import { users, passwords, newUserData } from '../src/constants/userData';

test('Order summary keeps the catalog price and the order completes', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);
  const cartPage = new CartPage(page);
  const title = 'Sauce Labs Onesie';

  await page.goto('');
  await loginPage.login(users.standard, passwords.valid);

  const catalogPrice = await inventoryPage.getPriceByTitle(title).innerText();
  await inventoryPage.addToCartByTitle(title);
  await inventoryPage.openCart();
  await cartPage.checkout();

  const user = newUserData();
  await checkoutStepOnePage.fillFirstName(user.firstName);
  await checkoutStepOnePage.fillLastName(user.lastName);
  await checkoutStepOnePage.fillZipCode(user.postalCode);
  await checkoutStepOnePage.continue();

  await expect(checkoutStepTwoPage.getPriceByTitle(title)).toHaveText(
    catalogPrice,
  );
  expect(await checkoutStepTwoPage.getItemsTotal()).toContain(catalogPrice);

  await checkoutStepTwoPage.finish();
  await expect(checkoutCompletePage.completeContainer).toBeVisible();
});
