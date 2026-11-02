import { BasePage } from '../BasePage';
import { LoginPageLocators } from './LoginPageLocators';

export class LoginPage extends BasePage {
  readonly locators: LoginPageLocators = new LoginPageLocators(this.page);

  async login(userName: string, password: string) {
    await this.locators.userName.fill(userName);
    await this.locators.password.fill(password);
    await this.locators.loginButton.click();
  }
}
