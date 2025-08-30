import { fail, succeed } from "@workspace/libs/result";

import { createClient } from "@/lib/supabase/server";

import { Role } from "../common/user";

type AddUserParams = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
export async function addUser({ name, email, password, role }: AddUserParams) {
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
