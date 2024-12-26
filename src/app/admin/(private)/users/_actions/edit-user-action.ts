"use server";

import * as v from "valibot";

import { createAction } from "@/lib/server-action";
import { editUser } from "./edit-user";

export const editUserAction = createAction(editUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
    name: v.pipe(v.string(), v.minLength(1), v.maxLength(64)),
    email: v.pipe(v.string(), v.minLength(1), v.email(), v.maxLength(255)),
  }),
  revalidatePaths: ["/admin/users"],
});
