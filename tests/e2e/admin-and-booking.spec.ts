import { test, expect } from '@playwright/test';

const runE2E = process.env.RUN_E2E === 'true';
const adminEmail = process.env.ADMIN_TEST_EMAIL;
const adminPassword = process.env.ADMIN_TEST_PASSWORD;

test.describe('Admin dashboard CRUD UI and booking flow', () => {
    test.skip(!runE2E, 'Set RUN_E2E=true to execute browser tests.');
    test.skip(!adminEmail || !adminPassword, 'Provide ADMIN_TEST_EMAIL and ADMIN_TEST_PASSWORD.');

    test('admin pages load and booking wizard UI works', async ({ page }) => {
        await page.goto('/admin/login');
        await page.getByPlaceholder('admin@example.com').fill(adminEmail!);
        await page.getByPlaceholder('••••••••').fill(adminPassword!);
        await page.getByRole('button', { name: /sign in securely/i }).click();

        await expect(page).toHaveURL(/\/admin$/);
        await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();

        await page.goto('/admin/packages');
        await expect(page.getByRole('heading', { name: /journeys/i })).toBeVisible();

        await page.goto('/admin/bookings');
        await expect(page.getByRole('heading', { name: /bookings/i })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Pending' })).toBeVisible();

        // Booking client-side wizard smoke check
        await page.goto('/book/00000000-0000-0000-0000-000000000008');
        await expect(page.getByText(/when would you like to travel/i)).toBeVisible();
    });
});
