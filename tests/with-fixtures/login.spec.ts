import { test, expect } from '../fixtures/fixtures';
import { errors } from '../../src/constants/errors';
import { users, passwords } from '../../src/constants/userData';

test('Standard user lands on the catalog after login', async ({
  inventoryPage,
}) => {
  await expect(inventoryPage.locators.inventoryContainer).toBeVisible();
});

test.describe('Locked out user', () => {
  test.use({
    userToLogin: { userName: users.lockedOut, password: passwords.valid },
    shouldLogout: false,
  });
  test('sees an error after login', async ({ loginPage }) => {
    await expect(loginPage.locators.errorAlert).toHaveText(errors.lockedOut);
  });
});
