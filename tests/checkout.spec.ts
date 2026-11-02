import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage/InventoryPage';
import { CartPage } from '../src/pages/CartPage/CartPage';
import { CheckoutStepOnePage } from '../src/pages/CheckoutStepOnePage/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../src/pages/CheckoutStepTwoPage/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage/CheckoutCompletePage';
import { ProductComponent } from '../src/pages/Components/ProductComponentPage';

import { users, passwords, newUserData } from '../src/constants/userData';

test('Order summary keeps the catalog price and the order completes', async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);
  const productComponent = new ProductComponent(page);
  const cartPage = new CartPage(page);
  const title = 'Sauce Labs Onesie';

  await page.goto('');
  await loginPage.login(users.standard, passwords.valid);

  const catalogPrice = await productComponent.locators.getPriceLocatorByTitle(title).innerText();
  await productComponent.addToCartByTitle(title);
  await inventoryPage.openCart();
  await cartPage.checkout();

  const user = newUserData();
  await checkoutStepOnePage.fillUserData(user);
  await checkoutStepOnePage.continue();

  await expect(productComponent.locators.getPriceLocatorByTitle(title)).toHaveText(
    catalogPrice,
  );
  expect(await checkoutStepTwoPage.getItemsTotal()).toContain(catalogPrice);

  await checkoutStepTwoPage.finish();
  await expect(checkoutCompletePage.locators.completeContainer).toBeVisible();
});
