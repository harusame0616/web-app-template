"use server";

import * as v from "valibot";

import { emailSchema, nameSchema, passwordSchema } from "@/domains/user/schema";
import { createServerAction } from "@workspace/libs/server-action/server";

import { roleSchema } from "../role";
import { addUser } from "./add-user";
import { deleteUser } from "./delete-user";
import { editUser } from "./edit-user";

export const addUserAction = createServerAction(addUser, {
  inputSchema: v.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema,
    officeId: v.pipe(v.string(), v.minLength(1)),
  }),
  revalidatePaths: ["/admin/users"],
});

export const editUserAction = createServerAction(editUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
    name: nameSchema,
    email: emailSchema,
    password: v.union([passwordSchema, v.pipe(v.string(), v.length(0))]),
    role: roleSchema,
    officeId: v.pipe(v.string(), v.minLength(1)),
  }),
  revalidatePath: ["/admin/users"],
});

export const deleteUserAction = createServerAction(deleteUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
  }),
  revalidatePaths: ["/admin/users"],
});
