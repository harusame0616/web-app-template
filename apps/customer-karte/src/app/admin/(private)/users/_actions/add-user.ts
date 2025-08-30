import { fail, Result, succeed } from "@workspace/libs/result";
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
}: AddUserParams): Promise<Result> {
  const supabase = await createClient();

  const result = await supabase.auth.admin.createUser({
    user_metadata: { name, role },
    password,
    email,
    email_confirm: true,
  });

  if (result.error) {
    switch (result.error.code) {
      case "email_exists":
        return fail("登録済みのメールアドレスです");
    }

    return fail("ユーザーの作成に失敗しました");
  }

  return succeed();
}
