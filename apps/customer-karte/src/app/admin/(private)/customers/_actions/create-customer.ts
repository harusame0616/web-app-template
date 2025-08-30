import { prisma } from "@workspace/database-customer-karte";
import { uuidv7 as uuid } from "uuidv7";

import { fail, Result, succeed } from "@workspace/libs/result";

type CreateCustomerParams = {
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  birthday: string;
  gender: "Man" | "Woman" | "Other";
  officeId: string;
};

export async function createCustomer(
  params: CreateCustomerParams,
): Promise<Result<{ customerId: string }>> {
  try {
    const customer = await prisma.customer.create({
      data: {
        customerId: uuid(),
        firstName: params.firstName,
        lastName: params.lastName,
        firstNameKana: params.firstNameKana,
        lastNameKana: params.lastNameKana,
        birthday: new Date(`${params.birthday}T00:00:00+09:00`),
        gender: params.gender,
        officeId: params.officeId,
        remarks: "",
      },
    });

    return succeed({ customerId: customer.customerId });
  } catch (error) {
    console.error("顧客作成エラー:", error);
    return fail("顧客の作成に失敗しました");
  }
}
