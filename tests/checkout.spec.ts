import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage/InventoryPage';
import { CartPage } from '../src/pages/CartPage/CartPage';
import { CheckoutStepOnePage } from '../src/pages/CheckoutStepOnePage/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../src/pages/CheckoutStepTwoPage/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage/CheckoutCompletePage';
import { ProductComponent } from '../src/pages/Components/ProductComponentPage';
import { users, passwords } from '../src/constants/userData';
import { newUserData } from '../src/utils/emailGenerator';
import { products } from '../src/constants/products';

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

  await page.goto('');
  await loginPage.login({
    userName: users.standard,
    password: passwords.valid,
  });

  const catalogPrice = await productComponent.locators
    .getPriceLocatorByTitle(products[2].title)
    .innerText();
  await productComponent.addToCartByTitle(products[2].title);
  await inventoryPage.openCart();
  await cartPage.checkout();

  const user = newUserData();
  await checkoutStepOnePage.fillUserData(user);
  await checkoutStepOnePage.continue();

  await expect(
    productComponent.locators.getPriceLocatorByTitle(products[2].title),
  ).toHaveText(catalogPrice);
  expect(await checkoutStepTwoPage.getItemsTotal()).toContain(catalogPrice);

  await checkoutStepTwoPage.finish();
  await expect(checkoutCompletePage.locators.completeContainer).toBeVisible();
});
