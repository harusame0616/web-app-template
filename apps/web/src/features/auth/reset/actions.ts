"use server";

import * as v from "valibot";

import { passwordSchema } from "@/domains/user/schema";
import { createServerAction } from "@/lib/server-action/server";

import { reset } from "./reset";
import { updatePassword } from "./update-password";

export const resetAction = createServerAction(reset, {
  inputSchema: v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty("メールアドレスを入力してください"),
      v.email("有効なメールアドレスを入力してください"),
    ),
  }),
});

export const updatePasswordAction = createServerAction(updatePassword, {
  inputSchema: v.object({
    password: passwordSchema,
  }),
});
