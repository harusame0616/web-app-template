import { fail, Result, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

type AddUserParams = {
  name: string;
  email: string;
  password: string;
};
export async function addUser({
  name,
  email,
  password,
}: AddUserParams): Promise<Result<undefined>> {
  const supabase = await createClient();

  const result = await supabase.auth.admin.createUser({
    user_metadata: { name },
    password,
    email,
    email_confirm: true,
  });

  if (result.error) {
    return fail("ユーザーの作成に失敗しました");
  }

  return succeed();
}
