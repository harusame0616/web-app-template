"use server";

import * as v from "valibot";

import { createServerAction } from "@workspace/libs/server-action/server";

import { createOffice } from "./add-office";

export const addOfficeAction = createServerAction(createOffice, {
  inputSchema: v.object({
    name: v.pipe(v.string(), v.minLength(1), v.maxLength(100)),
  }),
  revalidatePaths: ["/admin/offices"],
});
