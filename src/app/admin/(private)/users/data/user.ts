import { createClient } from "@/lib/supabase/server";
import * as v from "valibot";

const userMetadataSchema = v.object({
  name: v.optional(v.string(), ""),
});

export type User = {
  userId: string;
  name: string;
  email: string;
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
        const { name } = v.parse(userMetadataSchema, userMetadata);
        return { userId, name, email: v.parse(v.string(), email) };
      }
    ),
    totalPage: Math.ceil(listUsersResult.data.total / perPage),
  };
}
