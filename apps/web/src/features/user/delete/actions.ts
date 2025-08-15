"use server";

import * as v from "valibot";

import { createServerAction } from "@/lib/server-action/server";

import { deleteUser } from "../delete/delete-user";
export const deleteUserAction = createServerAction(deleteUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
  }),
  revalidatePaths: ["/admin/users"],
});
