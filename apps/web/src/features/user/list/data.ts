import { createClient } from "@/lib/supabase/server";

import { Role } from "../common/user";

export async function getUsers(page: number) {
  const supabase = await createClient();
  const perPage = 20;

  // 全認証ユーザーを取得
  const listUsersResult = await supabase.auth.admin.listUsers({
    page,
    perPage,
  });

  if (listUsersResult.error) {
    throw new Error(listUsersResult.error.message);
  }

  return {
    users: listUsersResult.data.users.map((authUser) => {
      return {
        userId: authUser.id,
        name: (authUser.user_metadata?.name as string) ?? "",
        email: authUser.email ?? "",
        role:
          ((authUser.user_metadata?.role as Role) || undefined) ??
          Role.General.value,
      };
    }),
    totalPage: Math.ceil(listUsersResult.data.total / perPage),
  };
}
