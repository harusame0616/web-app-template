"use server";

import * as v from "valibot";

import { createAction } from "@/lib/server-action";
import { addUser } from "./add-user";


export const addUserAction = createAction(addUser, {
  inputSchema: v.object({
    name: v.pipe(v.string(), v.minLength(1), v.maxLength(64)),
    email: v.pipe(v.string(), v.minLength(1), v.email(), v.maxLength(255)),
  }),
  revalidatePaths: ["/admin/users"],
});
