import { expect, test } from "@playwright/test";

// 認証なしでテストを実行
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("管理画面パスワードリセット", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/reset");
  });

  test("ログイン画面へのリンクが機能する", async ({ page }) => {
    await test.step("ログインに戻るリンクをクリック", async () => {
      await page.getByRole("link", { name: "ログインに戻る" }).click();
    });

    await test.step("ログイン画面に遷移する", async () => {
      await expect(page).toHaveURL("/admin/login");
      await expect(page.getByText("管理画面にログイン")).toBeVisible();
    });
  });

  test("バリデーションエラーが表示される", async ({ page }) => {
    await test.step("空のまま送信", async () => {
      await page.getByRole("button", { name: "リセットメール送信" }).click();
      await expect(
        page.getByText("メールアドレスを入力してください"),
      ).toBeVisible();
    });

    await test.step("無効なメールアドレスを入力", async () => {
      await page.getByLabel("メールアドレス").fill("invalid-email");
      await page.getByRole("button", { name: "リセットメール送信" }).click();
      await expect(
        page.getByText("有効なメールアドレスを入力してください"),
      ).toBeVisible();
    });
  });

  test("正しいメールアドレスでリセットメール送信", async ({ page }) => {
    await test.step("有効なメールアドレスを入力", async () => {
      await page.getByLabel("メールアドレス").fill("admin@example.com");
    });

    await test.step("送信ボタンをクリック", async () => {
      await page.getByRole("button", { name: "リセットメール送信" }).click();
    });

    await test.step("成功後完了ページにリダイレクト", async () => {
      // Supabaseのモック環境では実際にメールは送信されないが、
      // 成功時は完了ページにリダイレクトされる
      await expect(page).toHaveURL("/admin/reset/complete");
    });
  });
});
