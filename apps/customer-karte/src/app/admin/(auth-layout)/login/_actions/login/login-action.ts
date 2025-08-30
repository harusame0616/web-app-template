"use server";

import * as v from "valibot";

import { emailSchema, passwordSchema } from "@/domains/user/schema";
import { createServerAction } from "@workspace/libs/server-action/server";

import { login } from "./login";

export const loginAction = createServerAction(login, {
  inputSchema: v.object({
    email: emailSchema,
    password: passwordSchema,
  }),
  requireAuth: false,
});
