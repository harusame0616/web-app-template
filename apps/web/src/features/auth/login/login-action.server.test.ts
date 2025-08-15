import { redirect } from "next/navigation";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { loginAction } from "./actions";
import { login } from "./login";

vi.mock("./login", () => ({
  login: vi.fn().mockResolvedValue({ success: true }),
}));
vi.mock("next/navigation");

describe("loginAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test.each([
    // 不要なパラメーターがあっても取り除かれる
    { email: "m@e.com", password: "123456", garbage: "garbage" },
    {
      email:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com",
      password:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
  ])(
    "正しいパラメーターを渡すとログイン処理が実行し、処理が成功するとリダイレクトする %s",
    async (params) => {
      await loginAction(params);

      const { email, password } = params;

      expect(login).toHaveBeenCalledWith({ email, password });
      expect(redirect).not.toHaveBeenCalled();
    },
  );

  test.each([
    // メールアドレスエラー
    { email: "", password: "123456" },
    { email: "a", password: "123456" },
    {
      email:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com",
      password: "123456",
    },
    { password: "123456" },
    // パスワードエラー
    { email: "a@example.com", password: "" },
    { email: "a@example.com", password: "12345" },
    { email: "a@example.com" },
    // その他（API として自由に呼び出せるので、型チェックでエラーになる値も確認しておく）
    "string",
    12345,
    null,
    undefined,
  ])(
    "パラメーターが正しくないとログイン処理は実行せず、バリデーション失敗を返す %s",
    async (params) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await loginAction(params as any);

      expect(login).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({
          success: false,
          // 基本フロントでバリデーションを行ってそのエラーを表示するため、バリデーションエラーのメッセージのチェックは行わない
        }),
      );
    },
  );
});
