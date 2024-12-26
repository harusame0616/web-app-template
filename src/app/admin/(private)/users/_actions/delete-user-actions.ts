"use server";

import * as v from "valibot";

import { createAction } from "@/lib/server-action";
import { deleteUser } from "./delete-user";

export const deleteUserAction = createAction(deleteUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
  }),
  revalidatePaths: ["/admin/users"],
});
