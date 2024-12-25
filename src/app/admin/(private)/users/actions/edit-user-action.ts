"use server";

import * as v from "valibot";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { fail, succeed } from "@/lib/result";
import { createAction } from "@/lib/server-action";

export const editUserAction = createAction(
  async (params) => {
    const result = await editUser(params);

    if (result.success) {
      revalidatePath("/admin/users");
    }

    return result;
  },
  {
    inputSchema: v.object({
      userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
      name: v.pipe(v.string(), v.minLength(1), v.maxLength(64)),
      email: v.pipe(v.string(), v.minLength(1), v.email(), v.maxLength(255)),
    }),
  }
);

type EditUserParams = {
  userId: string;
  name: string;
  email: string;
};
async function editUser({ userId, name, email }: EditUserParams) {
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
