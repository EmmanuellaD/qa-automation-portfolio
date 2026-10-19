import { test, expect } from '@playwright/test';

test('LOGIN-001 Valid user can log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('LOGIN-002 Locked-out user cannot log in', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/locked out/i)).toBeVisible();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('LOGIN-003 invalid password rejected', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('new_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/do not match any user in this service/i)).toBeVisible();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('LOGIN-004 Invalid username rejected', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('new_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText(/do not match any user in this service/i)
  ).toBeVisible();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('LOGIN-005 Empty username validation', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText(/username is required/i)
  ).toBeVisible();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});


test('LOGIN-006 Empty password validation', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText(/password is required/i)
  ).toBeVisible();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});


test('LOGIN-007 Error message updates correctly', async ({ page }) => {
  await page.goto('/');

  // Submit with both fields empty
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText(/username is required/i)
  ).toBeVisible();

  // Fix the username but leave password empty
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText(/password is required/i)
  ).toBeVisible();

  // The old username error should be gone
  await expect(
    page.getByText(/username is required/i)
  ).not.toBeVisible();
});


test('LOGIN-008 Successful login redirects to inventory', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(
    'https://www.saucedemo.com/inventory.html'
  );

  await expect(
    page.getByText('Products')
  ).toBeVisible();
});