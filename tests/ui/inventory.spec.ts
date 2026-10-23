import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test('CART-001 User can add product and open cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addBackpackToCart();

  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.openCart();

  await expect(page).toHaveURL(/cart\.html/);

  await expect(cartPage.cartItem).toHaveCount(1);
});

test('CART-002 User can remove product from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addBackpackToCart();

  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.removeBackpackFromCart();

  await expect(inventoryPage.cartBadge).not.toBeVisible();
});