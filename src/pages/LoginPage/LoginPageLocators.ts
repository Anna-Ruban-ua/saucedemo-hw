import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class LoginPageLocators extends BaseLocator {
  readonly userName: Locator = this.page.getByTestId('username');
  readonly password: Locator = this.page.getByTestId('password');
  readonly loginButton: Locator = this.page.getByTestId('login-button');
}
