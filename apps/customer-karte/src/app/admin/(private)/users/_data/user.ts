import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { Role } from "../role";
import { getAllOffices } from "../../offices/_data/office";

export type User = {
  userId: string;
  name: string;
  email: string;
  role: Role;
  officeId: string;
  officeName?: string;
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

  // 営業所データを取得
  const offices = await getAllOffices();
  const officeMap = new Map(
    offices.map((office) => [office.officeId, office.name]),
  );

  return {
    users: listUsersResult.data.users.map((authUser) => {
      return {
        userId: authUser.id,
        name: authUser.user_metadata.name,
        email: authUser.email ?? "",
        role: authUser.user_metadata.role,
        officeId: authUser.user_metadata.officeId,
        officeName: officeMap.get(authUser.user_metadata.officeId),
      };
    }),
    totalPage: Math.ceil(listUsersResult.data.total / perPage),
  };
}
