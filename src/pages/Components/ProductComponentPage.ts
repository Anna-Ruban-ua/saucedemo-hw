import { BaseComponent } from './BaseComponent';
import { ProductComponentLocators } from './ProductComponentLocators';

export class ProductComponent extends BaseComponent {
  readonly locators: ProductComponentLocators = new ProductComponentLocators(
    this.page,
  );

  async addToCartByTitle(title: string) {
    const product = this.locators.getProductByTitle(title);
    await this.locators.getAddToCartLocatorByProduct(product).click();
  }

  async removeFromCartByTitle(title: string) {
    const product = this.locators.getProductByTitle(title);
    await this.locators.getRemoveFromCartLocatorByProduct(product).click();
  }
}
