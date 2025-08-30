"use server";

import * as v from "valibot";

import { updateCustomer } from "./update-customer";
import { createServerAction } from "@workspace/libs/server-action/server";

const genderSchema = v.picklist(["Man", "Woman", "Other"]);

export const updateCustomerAction = createServerAction(updateCustomer, {
  inputSchema: v.object({
    customerId: v.pipe(v.string(), v.minLength(1)),
    firstName: v.pipe(v.string(), v.minLength(1), v.maxLength(4096)),
    lastName: v.pipe(v.string(), v.minLength(1), v.maxLength(4096)),
    firstNameKana: v.pipe(
      v.string(),
      v.minLength(1),
      v.maxLength(4096),
      v.regex(/^[ァ-ヴー]+$/, "カタカナで入力してください"),
    ),
    lastNameKana: v.pipe(
      v.string(),
      v.minLength(1),
      v.maxLength(4096),
      v.regex(/^[ァ-ヴー]+$/, "カタカナで入力してください"),
    ),
    birthday: v.pipe(
      v.string(),
      v.regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD形式で入力してください"),
    ),
    gender: genderSchema,
    officeId: v.string(),
  }),
  revalidatePath: (params) => [
    `/admin/customers/${params.customerId}`,
    "/admin/customers",
  ],
});
