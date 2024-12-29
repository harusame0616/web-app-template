import { expect, test } from "@playwright/test";

test("タイトルが設定されている", async ({ page }) => {
  await page.goto("/admin/login");

  await expect(page).toHaveTitle(/^ログイン \| DEMO APP/);
});
