"use server";

import * as v from "valibot";

import { createAction } from "@/lib/server-action";
import { addUser } from "./add-user";
import { editUser } from "./edit-user";
import { deleteUser } from "./delete-user";

export const addUserAction = createAction(addUser, {
  inputSchema: v.object({
    name: v.pipe(v.string(), v.minLength(1), v.maxLength(64)),
    email: v.pipe(v.string(), v.minLength(1), v.email(), v.maxLength(255)),
    password: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
  }),
  revalidatePaths: ["/admin/users"],
});

export const editUserAction = createAction(editUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
    name: v.pipe(v.string(), v.minLength(1), v.maxLength(64)),
    email: v.pipe(v.string(), v.minLength(1), v.email(), v.maxLength(255)),
    password: v.pipe(v.string()),
  }),
  revalidatePaths: ["/admin/users"],
});

export const deleteUserAction = createAction(deleteUser, {
  inputSchema: v.object({
    userId: v.pipe(v.string(), v.minLength(1), v.uuid()),
  }),
  revalidatePaths: ["/admin/users"],
});
