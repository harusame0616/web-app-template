import { fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

type EditUserParams = {
  userId: string;
  name: string;
  email: string;
};
export async function editUser({ userId, name, email }: EditUserParams) {
  const supabase = await createClient();

  const result = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { name },
    email,
    email_confirm: true,
  });

  if (result.error) {
    return fail("ユーザーの更新に失敗しました。");
  }

  return succeed();
}
