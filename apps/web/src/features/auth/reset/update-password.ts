import { fail, succeed } from "@workspace/libs/result";

import { createClient } from "@/lib/supabase/server";

export async function updatePassword({ password }: { password: string }) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) {
      if (error.code === "same_password") {
        return succeed();
      }

      return fail("パスワードの更新に失敗しました");
    }
  } catch {
    return fail("予期せぬエラーが発生しました");
  }

  return succeed();
}
