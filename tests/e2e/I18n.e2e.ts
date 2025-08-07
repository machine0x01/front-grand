import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from English to Arabic using dropdown and verify text on the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', { name: 'Boilerplate Code for Your Next.js Project with Tailwind CSS' }),
      ).toBeVisible();

      await page.getByLabel('lang-switcher').selectOption('ar');

      await expect(
        page.getByRole('heading', { name: 'كود البداية لـ Next.js مع Tailwind CSS' }),
      ).toBeVisible();
    });

    test('should switch language from English to Arabic using URL and verify text on the sign-in page', async ({ page }) => {
      await page.goto('/sign-in');

      await expect(page.getByText('Email address')).toBeVisible();

      await page.goto('/ar/sign-in');

      await expect(page.getByText('عنوان البريد الإلكتروني')).toBeVisible();
    });
  });
});
