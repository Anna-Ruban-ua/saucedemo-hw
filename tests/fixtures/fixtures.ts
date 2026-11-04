import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage/InventoryPage';
import { CartPage } from '../../src/pages/CartPage/CartPage';
import { CheckoutStepOnePage } from '../../src/pages/CheckoutStepOnePage/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../src/pages/CheckoutStepTwoPage/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../src/pages/CheckoutCompletePage/CheckoutCompletePage';
import { ProductComponent } from '../../src/pages/Components/ProductComponentPage';
import { HeaderPage } from '../../src/pages/HeaderPage/HeaderPage';
import { users, passwords } from '../../src/constants/userData';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  productComponent: ProductComponent;
  headerPage: HeaderPage;
  userToLogin: { userName: string; password: string };
  shouldLogout: boolean;
  login: void;
  logout: void;
};

const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await use(checkoutStepOnePage);
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await use(checkoutStepTwoPage);
  },

  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },

  productComponent: async ({ page }, use) => {
    const productComponent = new ProductComponent(page);
    await use(productComponent);
  },

  headerPage: async ({ page }, use) => {
    const headerPage = new HeaderPage(page);
    await use(headerPage);
  },

  userToLogin: { userName: users.standard, password: passwords.valid },
  shouldLogout: true,

  login: [
    async ({ loginPage, userToLogin, page }, use) => {
      await page.goto('/');
      await loginPage.login(userToLogin);
      await use();
    },
    { auto: true },
  ],

  logout: [
    async ({ headerPage, shouldLogout }, use) => {
      await use();
      if (shouldLogout) {
        await headerPage.logout();
      }
    },
    { auto: true },
  ],
});

export { test, expect };
