"use server";

import { createAction } from "@/lib/server-action";
import * as v from "valibot";
import { reset } from "./reset";

export const resetAction = createAction(reset, {
  inputSchema: v.object({ email: v.pipe(v.string(), v.email()) }),
  redirectTo: "/login/reset/message",
});
