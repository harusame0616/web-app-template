"use server";

import * as v from "valibot";

import { createServerAction } from "@workspace/libs/server-action/server";

import { deleteInterview } from "./delete-interview";

export const deleteInterviewAction = createServerAction(
  async ({ noteId, customerId }) => {
    return await deleteInterview(noteId, customerId);
  },
  {
    inputSchema: v.object({
      noteId: v.string(),
      customerId: v.string(),
    }),
    revalidatePath: ({ customerId }) => `/admin/customers/${customerId}/notes`,
  },
);
