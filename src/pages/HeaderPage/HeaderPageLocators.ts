import { Locator } from '@playwright/test';
import { BaseLocator } from '../BaseLocator';

export class HeaderPageLocators extends BaseLocator {
  readonly burgerMenu: Locator = this.page.getByRole('button', {
    name: 'Open Menu',
  });
  readonly logout: Locator = this.page.getByTestId('logout-sidebar-link');
}
