"use server";

import * as v from "valibot";

import { createServerAction } from "@workspace/libs/server-action/server";

import { deleteOffice } from "./delete-office";

export const deleteOfficeAction = createServerAction(deleteOffice, {
  inputSchema: v.object({
    officeId: v.pipe(v.string(), v.minLength(1)),
  }),
  revalidatePaths: ["/admin/offices"],
});
