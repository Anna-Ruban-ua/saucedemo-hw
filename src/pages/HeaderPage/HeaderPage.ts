import { BasePage } from '../BasePage';
import { HeaderPageLocators } from './HeaderPageLocators';

export class HeaderPage extends BasePage {
  readonly locators: HeaderPageLocators = new HeaderPageLocators(this.page);

  async logout() {
    await this.locators.burgerMenu.click();
    await this.locators.logout.click();
  }
}
