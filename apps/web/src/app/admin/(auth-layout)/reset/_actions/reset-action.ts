"use server";

import * as v from "valibot";

import { createAction } from "@/lib/server-action";

import { reset } from "./reset";

export const resetAction = createAction(reset, {
  inputSchema: v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty("メールアドレスを入力してください"),
      v.email("有効なメールアドレスを入力してください"),
    ),
  }),
});
