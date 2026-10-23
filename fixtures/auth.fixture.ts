import { test, expect } from '../../fixtures/auth.fixture';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('CHECKOUT-001 User can complete a purchase', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();

  await expect(cartPage.cartItem).toHaveCount(1);

  await cartPage.checkout();

  await checkoutPage.enterCustomerInformation(
    'Emma',
    'Tester',
    'J8Y2G9'
  );

  await checkoutPage.finishOrder();

  await expect(
    checkoutPage.confirmationMessage
  ).toBeVisible();
});