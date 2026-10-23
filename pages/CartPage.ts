import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItem: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}