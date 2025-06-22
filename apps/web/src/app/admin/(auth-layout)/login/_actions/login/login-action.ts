"use server";

import * as v from "valibot";

import { emailSchema, passwordSchema } from "@/domains/user/schema";
import { createAction } from "@/lib/server-action";

import { login } from "./login";

export const loginAction = createAction(login, {
  inputSchema: v.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});
