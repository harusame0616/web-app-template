"use server";

import { createServerAction } from "@workspace/libs/server-action/server";
import * as v from "valibot";

import { emailSchema, nameSchema, passwordSchema } from "@/domains/user/schema";

import { roleSchema } from "../common/user";
import { addUser } from "./add-user";

export const addUserAction = createServerAction(addUser, {
  inputSchema: v.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema,
  }),
  revalidatePaths: ["/admin/users"],
});
