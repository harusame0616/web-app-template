import { fail, Result, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

import { Role } from "../role";

type EditUserParams = {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: Role;
};
export async function editUser({
  userId,
  name,
  email,
  password,
  role,
}: EditUserParams): Promise<Result<undefined>> {
  const supabase = await createClient();

  const result = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { name, role },
    password: password || undefined,
    email,
    email_confirm: true,
  });

  if (result.error) {
    return fail("ユーザーの更新に失敗しました。");
  }

  return succeed();
}
