import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private userName: Locator = this.page.getByTestId('username');
  private password: Locator = this.page.getByTestId('password');
  private loginButton: Locator = this.page.getByTestId('login-button');

  async login(userName: string, password: string) {
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
