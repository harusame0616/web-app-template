import { fail, succeed } from "@workspace/libs/result";

import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const client = await createClient();
  const result = await client.auth.signOut();

  if (result.error) {
    return fail("ログアウトに失敗しました");
  }

  return succeed();
}
