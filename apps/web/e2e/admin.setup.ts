import { test as setup } from "@playwright/test";
import { adminUser } from "../prisma/fixtures/users";

const authFile = ".auth/admin-auth.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/admin/login");

  await page.getByLabel("メールアドレス").fill(adminUser.email);
  await page.getByLabel("パスワード").fill(adminUser.password);

  await page.getByRole("button", { name: "ログイン" }).click();

  await page.waitForURL("/admin/**");

  await page.context().storageState({ path: authFile });
});
