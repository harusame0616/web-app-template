"use server";

import * as v from "valibot";

import { createServerAction } from "@workspace/libs/server-action/server";

import { reset } from "./reset";

export const resetAction = createServerAction(reset, {
  inputSchema: v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty("メールアドレスを入力してください"),
      v.email("有効なメールアドレスを入力してください"),
    ),
  }),
});
