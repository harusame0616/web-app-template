"use server";

import { createAction } from "@/lib/server-action";
import * as v from "valibot";
import { reset } from "./reset";
import { emailSchema } from "@/domains/user/schema";

export const resetAction = createAction(reset, {
  inputSchema: v.object({ email: emailSchema }),
  redirectTo: "/login/reset/message",
});
