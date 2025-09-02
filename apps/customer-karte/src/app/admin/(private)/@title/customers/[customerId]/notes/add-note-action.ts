"use server";

import * as v from "valibot";

import { addNote } from "./add-note";
import { createServerAction } from "@workspace/libs/server-action/server";

export const addNoteAction = createServerAction(addNote, {
  inputSchema: v.object({
    customerId: v.pipe(
      v.string(),
      v.minLength(1, "顧客IDは必須です"),
      v.maxLength(100, "顧客IDは100文字以内で入力してください"),
    ),
    text: v.pipe(
      v.string(),
      v.minLength(1, "ノートの内容は必須です"),
      v.maxLength(5000, "ノートは5000文字以内で入力してください"),
    ),
  }),
  revalidatePath: (params) => `/admin/customers/${params.customerId}/notes`,
});
