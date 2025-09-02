import { fail, Result, succeed } from "@workspace/libs/result";
import { createClient } from "@/lib/supabase/server";
import { uuidv7 as uuid } from "uuidv7";

import { Role } from "../role";
import { prisma } from "@workspace/database-customer-karte";

type AddUserParams = {
  name: string;
  email: string;
  password: string;
  role: Role;
  officeId: string;
};
export async function addUser({
  name,
  email,
  password,
  role,
  officeId,
}: AddUserParams): Promise<Result> {
  const supabase = await createClient();

  const staffId = uuid();
  await prisma.staff.create({
    data: {
      staffId,
      name,
      officeId,
    },
  });

  const result = await supabase.auth.admin.createUser({
    user_metadata: { staffId, name, role, officeId },
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
