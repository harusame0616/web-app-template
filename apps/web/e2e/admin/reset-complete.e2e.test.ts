import { expect, test } from "@playwright/test";

// 認証なしでテストを実行
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("管理画面パスワードリセット完了ページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/reset/complete");
  });

  test("ナビゲーションリンクが機能する", async ({ page }) => {
    await test.step("ログインへ戻るリンクが機能する", async () => {
      await page.getByRole("link", { name: "ログインへ戻る" }).click();
      await expect(page).toHaveURL("/admin/login");
    });
  });

  test("再度リセットするリンクが機能する", async ({ page }) => {
    await test.step("再度リセットするリンクが機能する", async () => {
      await page.getByRole("link", { name: "再度リセットする" }).click();
      await expect(page).toHaveURL("/admin/reset");
    });
  });

  test("完了ページからリセットフロー全体を確認", async ({ page }) => {
    await test.step("再度リセットするリンクからリセットページへ", async () => {
      await page.getByRole("link", { name: "再度リセットする" }).click();
      await expect(page).toHaveURL("/admin/reset");
    });

    await test.step("リセットフォームを送信", async () => {
      await page.getByLabel("メールアドレス").fill("admin@example.com");
      await page.getByRole("button", { name: "リセットメール送信" }).click();
    });

    await test.step("完了ページに戻る", async () => {
      await expect(page).toHaveURL("/admin/reset/complete");
      await expect(
        page.getByRole("heading", { name: "メール送信完了" }),
      ).toBeVisible();
    });
  });
});
