import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly removeBackpackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.getByText('Products');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
     this.removeBackpackButton = page.locator(
    '[data-test="remove-sauce-labs-backpack"]'
  );
  }

  async addBackpackToCart() {
    await this.page
      .getByRole('button', { name: 'Add to cart' })
      .first()
      .click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async removeBackpackFromCart() {
    await this.removeBackpackButton.click();
  }

}