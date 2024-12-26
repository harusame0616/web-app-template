import { fail, Result, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

type LoginParams = { email: string; password: string };
export async function login(loginParams: LoginParams): Promise<Result> {
  const client = await createClient();

  const result = await client.auth.signInWithPassword(loginParams);
  return result.error
    ? fail("メールアドレス、またはパスワードが間違っています")
    : succeed();
}
