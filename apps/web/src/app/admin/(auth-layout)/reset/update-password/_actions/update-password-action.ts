"use server";

import * as v from "valibot";

import { passwordSchema } from "@/domains/user/schema";
import { createAction } from "@/lib/server-action";

import { updatePassword } from "./update-password";

export const updatePasswordAction = createAction(updatePassword, {
  inputSchema: v.object({
    password: passwordSchema,
  }),
});
