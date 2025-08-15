"use server";

import * as v from "valibot";

import { emailSchema, nameSchema, passwordSchema } from "@/domains/user/schema";
import { createServerAction } from "@/lib/server-action/server";

import { roleSchema } from "../common/user";
import { editUser } from "../edit/edit-user";

export const editUserAction = createServerAction(editUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
    name: nameSchema,
    email: emailSchema,
    password: v.union([passwordSchema, v.pipe(v.string(), v.length(0))]),
    role: roleSchema,
  }),
  revalidatePaths: ["/admin/users"],
});
