"use server";

import { createAction } from "@/lib/server-action";
import * as v from "valibot";
import { login } from "./login";
import { emailSchema, passwordSchema } from "@/domains/user/schema";

export const loginAction = createAction(login, {
  inputSchema: v.object({
    email: emailSchema,
    password: passwordSchema,
  }),
  redirectTo: "/",
});
