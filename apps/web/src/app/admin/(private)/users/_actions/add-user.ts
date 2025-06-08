import { fail, Result, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

import { Role } from "../role";

type AddUserParams = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
export async function addUser({
  name,
  email,
  password,
  role,
}: AddUserParams): Promise<Result<undefined>> {
  const supabase = await createClient();

  const result = await supabase.auth.admin.createUser({
    user_metadata: { name, role },
    password,
    email,
    email_confirm: true,
  });

  if (result.error) {
    return fail("ユーザーの作成に失敗しました");
  }

  return succeed();
}
