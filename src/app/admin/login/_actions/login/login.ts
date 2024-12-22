import { fail, Result, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

type LoginParams = { email: string; password: string };
export async function login(loginParams: LoginParams): Promise<Result> {
  const client = await createClient();

  try {
    const result = await client.auth.signInWithPassword(loginParams);
    if (result.error) {
      return {
        success: false,
        message: "メールアドレス、またはパスワードが間違っています",
      };
    }
    return succeed();
  } catch (error) {
    return fail("ログイン時にエラーが発生しました。時間をおいてお試しください");
  }
}
