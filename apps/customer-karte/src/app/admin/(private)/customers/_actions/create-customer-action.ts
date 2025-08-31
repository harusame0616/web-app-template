"use server";

import * as v from "valibot";

import { createCustomer } from "./create-customer";
import { createServerAction } from "@workspace/libs/server-action/server";

const genderSchema = v.picklist(
  ["Man", "Woman", "Other"],
  "性別を選択してください",
);

export const createCustomerAction = createServerAction(createCustomer, {
  inputSchema: v.object({
    firstName: v.pipe(
      v.string(),
      v.minLength(1, "名は必須です"),
      v.maxLength(24, "名は24文字以内で入力してください"),
    ),
    lastName: v.pipe(
      v.string(),
      v.minLength(1, "姓は必須です"),
      v.maxLength(24, "姓は24文字以内で入力してください"),
    ),
    firstNameKana: v.union([
      v.literal(""),
      v.pipe(
        v.string(),
        v.minLength(1, "名（カナ）を入力してください"),
        v.maxLength(24, "名（カナ）は24文字以内で入力してください"),
        v.regex(/^[ァ-ヴー]+$/, "カタカナで入力してください"),
      ),
    ]),
    lastNameKana: v.union([
      v.literal(""),
      v.pipe(
        v.string(),
        v.minLength(1, "姓（カナ）を入力してください"),
        v.maxLength(24, "姓（カナ）は24文字以内で入力してください"),
        v.regex(/^[ァ-ヴー]+$/, "カタカナで入力してください"),
      ),
    ]),
    birthday: v.nullable(
      v.pipe(
        v.string(),
        v.regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD形式で入力してください"),
      ),
    ),
    gender: genderSchema,
    officeId: v.pipe(v.string(), v.minLength(1, "事業所は必須です")),
    emails: v.array(
      v.union([
        v.literal(""),
        v.pipe(
          v.string(),
          v.minLength(1, "メールアドレスは必須です"),
          v.email("有効なメールアドレスを入力してください"),
          v.maxLength(320, "メールアドレスは320文字以内で入力してください"),
        ),
      ]),
    ),
    phones: v.array(
      v.union([
        v.literal(""),
        v.pipe(
          v.string(),
          v.minLength(1, "電話番号は必須です"),
          v.regex(/^[0-9-+()\s]+$/, "有効な電話番号を入力してください"),
          v.maxLength(20, "電話番号は20文字以内で入力してください"),
        ),
      ]),
    ),
    addresses: v.array(
      v.union([
        v.literal(""),
        v.pipe(
          v.string(),
          v.minLength(1, "住所は必須です"),
          v.maxLength(500, "住所は500文字以内で入力してください"),
        ),
      ]),
    ),
    remarks: v.pipe(
      v.string(),
      v.maxLength(5000, "備考は5000文字以内で入力してください"),
    ),
  }),
  revalidatePaths: ["/admin/customers"],
  redirectTo: undefined,
});
