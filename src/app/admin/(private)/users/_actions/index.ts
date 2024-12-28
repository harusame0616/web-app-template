"use server";

import * as v from "valibot";

import { createAction } from "@/lib/server-action";
import { roleSchema } from "../role";
import { addUser } from "./add-user";
import { deleteUser } from "./delete-user";
import { editUser } from "./edit-user";
import { emailSchema, nameSchema, passwordSchema } from "@/domains/user/schema";

export const addUserAction = createAction(addUser, {
  inputSchema: v.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    role: roleSchema,
  }),
  revalidatePaths: ["/admin/users"],
});

export const editUserAction = createAction(editUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
    name: nameSchema,
    email: emailSchema,
    password: v.union([passwordSchema, v.pipe(v.string(), v.length(0))]),
    role: roleSchema,
  }),
  revalidatePaths: ["/admin/users"],
});

export const deleteUserAction = createAction(deleteUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
  }),
  revalidatePaths: ["/admin/users"],
});
