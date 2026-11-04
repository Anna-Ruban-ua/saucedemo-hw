import { test, expect } from '../fixtures/fixtures';
import { newUserData } from '../../src/utils/emailGenerator';
import { products } from '../../src/constants/products';
import { users, passwords } from '../../src/constants/userData';

test('Order summary keeps the catalog price and the order completes', async ({
  productComponent,
  inventoryPage,
  cartPage,
  checkoutStepOnePage,
  checkoutStepTwoPage,
  checkoutCompletePage,
}) => {
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

test.describe('Problem user', () => {
  test.use({
    userToLogin: { userName: users.problem, password: passwords.valid },
  });
  test('can not proceed checkout', async ({
    productComponent,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
  }) => {
    await productComponent.addToCartByTitle(products[2].title);
    await inventoryPage.openCart();
    await cartPage.checkout();

    const user = newUserData();
    await checkoutStepOnePage.fillUserData(user);
    await checkoutStepOnePage.continue();

    expect(checkoutStepTwoPage.locators.finishButton).not.toBeVisible();
  });
});
