import { test, expect } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000';

const routes = ['/', '/calisma-alanlari', '/iletisim', '/kvkk/aydinlatma'];

test.describe('Temel sayfa kontrolleri', () => {
  for (const route of routes) {
    test(`GET ${route} 200 döner`, async ({ request }) => {
      const response = await request.get(`${baseURL}${route}`);
      expect(response.status()).toBeLessThan(400);
    });
  }

  test('Çerez bannerı görünüyor ve analytics scripti varsayılan olarak yok', async ({ page }) => {
    await page.goto(`${baseURL}/`);
    await expect(page.getByText('Çerezlere İlişkin Bilgilendirme')).toBeVisible();
    await expect(page.locator('script#analytics')).toHaveCount(0);
  });
});
