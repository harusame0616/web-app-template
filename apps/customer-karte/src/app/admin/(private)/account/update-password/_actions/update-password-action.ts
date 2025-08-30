"use server";

import * as v from "valibot";

import { createServerAction } from "@workspace/libs/server-action/server";

import { updatePassword } from "./update-password";

export const updatePasswordAction = createServerAction(
  async (input) => {
    return updatePassword({
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    });
  },
  {
    inputSchema: v.object({
      currentPassword: v.pipe(
        v.string(),
        v.nonEmpty("現在のパスワードを入力してください"),
      ),
      newPassword: v.pipe(
        v.string(),
        v.nonEmpty("新しいパスワードを入力してください"),
        v.minLength(8, "パスワードは8文字以上で入力してください"),
      ),
    }),
    revalidatePath: "/admin",
  },
);
