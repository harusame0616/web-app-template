"use server";

import * as v from "valibot";

import { emailSchema } from "@/domains/user/schema";
import { createAction } from "@/lib/server-action";

import { reset } from "./reset";

export const resetAction = createAction(reset, {
  inputSchema: v.object({ email: emailSchema }),
  redirectTo: "/login/reset/message",
});
