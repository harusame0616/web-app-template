"use server";

import { createAction } from "@/lib/server-action";
import * as v from "valibot";
import { invite } from "./invite";

export const invitationAction = createAction(invite, {
  inputSchema: v.object({ email: v.string() }),
  redirectTo: "/register/message",
});
