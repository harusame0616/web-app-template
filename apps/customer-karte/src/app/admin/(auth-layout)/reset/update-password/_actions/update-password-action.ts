"use server";

import * as v from "valibot";

import { passwordSchema } from "@/domains/user/schema";
import { createServerAction } from "@workspace/libs/server-action/server";

import { updatePassword } from "./update-password";

export const updatePasswordAction = createServerAction(updatePassword, {
  inputSchema: v.object({
    password: passwordSchema,
  }),
});
