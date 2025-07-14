import { test, expect } from '@playwright/test';

test.describe('SingleTrade E2E (Protected)', () => {
  test('renders trade data for logged-in user', async ({ page }) => {
    // Mock the refresh token endpoint to simulate a logged-in user
    await page.route('**/auth/refresh_token', async (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          accessToken: 'mocked-access-token',
          tokenPayload: { username: 'testuser' }
        }),
      });
    });

    // Intercept GraphQL POST and mock response
    await page.route('**/graphql', async (route, request) => {
      const body = request.postDataJSON();
      if (body.operationName === 'getUserTrades') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              getUserTrade: {
                id: '123',
                title: 'E2E Test Trade',
                asset: 'AAPL',
                status: 'OPEN',
                enterDate: '2023-01-01T10:00:00Z',
                closeDate: '2023-01-02T10:00:00Z',
                enterPrice: 100,
                closePrice: 110,
                volume: 10,
                images: [
                  { url: 'http://example.com/img1.jpg', name: 'img1' },
                  { url: 'http://example.com/img2.jpg', name: 'img2' },
                ],
              },
            },
          }),
        });
      } else {
        route.continue();
      }
    });

    // Go to the SingleTrade page (protected route)
    await page.goto('/#/123');

    // Check for heading
    await expect(page.getByRole('heading', { name: /E2E Test Trade/i })).toBeVisible();
    // Check for property fields
    await expect(page.getByText('AAPL')).toBeVisible();
    await expect(page.getByText('OPEN')).toBeVisible();
    await expect(page.getByText('100')).toBeVisible();
    await expect(page.getByText('110')).toBeVisible();
    await expect(page.getByText('10', { exact: true})).toBeVisible();
    // Check for images
    // Wait for the first image to be visible before asserting
    await page.waitForSelector('img[alt="img1"]', { state: 'visible' });
    await expect(page.getByAltText('img1')).toBeVisible();
    await expect(page.getByAltText('img2')).not.toBeVisible();
    // Click the next button to show the second image
    await page.click('.button-right');
    await page.waitForSelector('img[alt="img2"]', { state: 'visible' });
    await expect(page.getByAltText('img2')).toBeVisible();
    await expect(page.getByAltText('img1')).not.toBeVisible();
  });
});
