"use server";

import * as v from "valibot";

import { createServerAction } from "@workspace/libs/server-action/server";

import { updateMail } from "./update-mail";

export const updateMailAction = createServerAction(
  async (input) => {
    return updateMail(input.newEmail);
  },
  {
    inputSchema: v.object({
      newEmail: v.pipe(
        v.string(),
        v.nonEmpty("メールアドレスを入力してください"),
        v.email("有効なメールアドレスを入力してください"),
      ),
    }),
    revalidatePath: "/admin",
  },
);
