import { test, expect } from '@playwright/test';

test.describe('Auth E2E (Mocked Server)', () => {
  test('user can register successfully', async ({ page }) => {
    await page.route('**/auth/register', async (route, request) => {
      const body = JSON.parse(request.postData() || '{}');
      if (body.username === 'newuser' && body.password === 'newpass123') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            accessToken: 'mocked-access-token',
            tokenPayload: { username: 'newuser' }
          }),
        });
      } else {
        route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Registration failed' }),
        });
      }
    });

    await page.goto('/#/register'); // Adjust route as needed
    await page.fill('input[name="username"]', 'newuser');
    await page.fill('input[name="password"]', 'newpass123');
    await page.click('button[type="submit"]');
    await expect(page.getByText('newuser')).toBeVisible();
  });

  test('shows error on registration failure', async ({ page }) => {
    await page.route('**/auth/register', async (route) => {
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Registration failed' }),
      });
    });
    await page.goto('/#/register');
    await page.fill('input[name="username"]', 'baduser');
    await page.fill('input[name="password"]', 'badpass');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/registration failed/i)).toBeVisible();
  });

  test('user can login successfully', async ({ page }) => {
    await page.route('**/auth/login', async (route, request) => {
      const body = JSON.parse(request.postData() || '{}');
      if (body.username === 'testuser' && body.password === 'password123') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            accessToken: 'mocked-access-token',
            tokenPayload: { username: 'testuser' }
          }),
        });
      } else {
        route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Invalid credentials' }),
        });
      }
    });

    await page.goto('/#/login'); // Adjust route as needed
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page.getByText('testuser')).toBeVisible();
  });

  test('shows error on invalid login', async ({ page }) => {
    await page.route('**/auth/login', async (route) => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Invalid credentials' }),
      });
    });
    await page.goto('/#/login');
    await page.fill('input[name="username"]', 'wronguser');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });
}); 