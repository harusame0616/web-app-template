import { fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

type DeleteUserParams = { userId: string };
export async function deleteUser({ userId }: DeleteUserParams) {
  const supabase = await createClient();

  const result = await supabase.auth.admin.deleteUser(userId);

  if (result.error) {
    return fail("ユーザーの削除に失敗しました");
  }

  return succeed();
}
