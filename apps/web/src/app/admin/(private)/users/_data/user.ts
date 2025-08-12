import { createClient } from "@/lib/supabase/server";

export type User = {
  userId: string;
  name: string;
  email: string;
  role: "admin" | "operator" | "viewer";
};
export async function getUsers(page: number) {
  const supabase = await createClient();
  const perPage = 10;

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
          (authUser.user_metadata?.role as "admin" | "operator" | "viewer") ??
          "viewer",
      };
    }),
    totalPage: Math.ceil(listUsersResult.data.total / perPage),
  };
}
