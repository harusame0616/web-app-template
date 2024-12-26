import { fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";
import { uuidv7 } from "uuidv7";

type AddUserParams = {
  name: string;
  email: string;
};
export async function addUser({ name, email }: AddUserParams) {
  const supabase = await createClient();

  const result = await supabase.auth.admin.createUser({
    user_metadata: { name },
    email,
    email_confirm: true,
  });

  if (result.error) {
    return fail("ユーザーの作成に失敗しました");
  }

  return succeed();
}
