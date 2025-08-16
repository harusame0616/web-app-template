"use server";

import * as v from "valibot";

import { createServerAction } from "@/lib/server-action/server";

import { getThreadDetail } from "./get-thread-detail";

export const getThreadDetailAction = createServerAction(getThreadDetail, {
  inputSchema: v.object({
    threadId: v.pipe(
      v.string(),
      v.minLength(1, "スレッドIDは必須です"),
      v.maxLength(255, "スレッドIDが長すぎます"),
    ),
  }),
});
