import { fail, Result, succeed } from "@workspace/libs/result";
import { createClient } from "@/lib/supabase/server";

type LoginParams = { email: string; password: string };
export async function login(loginParams: LoginParams): Promise<Result> {
  const client = await createClient();

  const result = await client.auth.signInWithPassword(loginParams);
  console.log(result);
  return result.error
    ? fail("メールアドレス、またはパスワードが間違っています")
    : succeed();
}
