import * as v from "valibot";

import { createClient } from "@/lib/supabase/server";

import { Role, roleSchema } from "../role";

const userMetadataSchema = v.object({
  name: v.optional(v.string(), ""),
  role: v.optional(roleSchema, () => Role.Viewer.value),
});

export type User = {
  userId: string;
  name: string;
  email: string;
  role: Role;
};
export async function getUsers(page: number) {
  const supabase = await createClient();
  const perPage = 10;
  const listUsersResult = await supabase.auth.admin.listUsers({
    page,
    perPage,
  });

  if (listUsersResult.error) {
    throw new Error(listUsersResult.error.message);
  }

  return {
    users: listUsersResult.data.users.map(
      ({ email, id: userId, user_metadata: userMetadata }) => {
        return {
          userId,
          email: v.parse(v.string(), email),
          ...v.parse(userMetadataSchema, userMetadata),
        };
      },
    ),
    totalPage: Math.ceil(listUsersResult.data.total / perPage),
  };
}
