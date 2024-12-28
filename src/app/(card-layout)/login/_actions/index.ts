"use server";

import { createAction } from "@/lib/server-action";
import * as v from "valibot";
import { login } from "./login";

export const loginAction = createAction(login, {
  inputSchema: v.object({
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
  }),
  redirectTo: "/",
});
