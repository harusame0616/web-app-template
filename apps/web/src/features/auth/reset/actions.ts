"use server";

import { createServerAction } from "@workspace/libs/server-action/server";
import * as v from "valibot";

import { passwordSchema } from "@/domains/user/schema";

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
