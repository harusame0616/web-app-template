import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { Role } from "../role";

export type User = {
  userId: string;
  name: string;
  email: string;
  role: Role;
};
export async function getUsers(page: number) {
  const supabase = await createClient();
  const getUserResult = await supabase.auth.getUser();
  if (getUserResult.error || !getUserResult.data) {
    redirect("/admin/login");
  }

  if (getUserResult.data.user.user_metadata.role === Role.General.value) {
    notFound();
  }

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
        name: authUser.user_metadata.name,
        email: authUser.email ?? "",
        role: authUser.user_metadata.role,
      };
    }),
    totalPage: Math.ceil(listUsersResult.data.total / perPage),
  };
}
