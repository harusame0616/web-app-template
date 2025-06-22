import { prisma } from "@/lib/prisma";
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

  // DBからユーザー情報を取得
  const dbUsers = await prisma.user.findMany({});
  const dbUserMap = new Map(dbUsers.map((u) => [u.userId, u]));

  // DBに存在するユーザーのみをフィルタリング
  const filteredUsers = listUsersResult.data.users.filter((authUser) => {
    const userId = authUser.user_metadata?.userId;
    return userId && dbUserMap.has(userId);
  });

  return {
    users: filteredUsers.map((authUser) => {
      const userId = authUser.user_metadata.userId;
      const dbUser = dbUserMap.get(userId)!;
      return {
        userId: dbUser.userId,
        name: dbUser.name,
        email: authUser.email ?? "",
        role: "admin" as const,
      };
    }),
    totalPage: Math.ceil(filteredUsers.length / perPage),
  };
}
