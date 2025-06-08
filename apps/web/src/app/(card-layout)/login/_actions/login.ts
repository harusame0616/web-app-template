"use server";

import { fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const client = await createClient();

  try {
    const result = await client.auth.signInWithPassword({ email, password });
    if (result.error) {
      console.log("認証失敗", { email, password, error: result.error });
      return fail("ログインに失敗しました");
    }
    console.log("認証成功", { email, id: result.data.user.id });
    return succeed();
  } catch (error) {
    console.error("認証エラー", { error, email, password });
    return fail("ログインに失敗しました");
  }
}
