"use server";

import * as v from "valibot";

import { createServerAction } from "@workspace/libs/server-action/server";

import { updateOffice } from "./update-office";

export const updateOfficeAction = createServerAction(updateOffice, {
  inputSchema: v.object({
    officeId: v.pipe(v.string(), v.minLength(1)),
    name: v.pipe(v.string(), v.minLength(1), v.maxLength(100)),
  }),
  revalidatePaths: ["/admin/offices"],
});
