import { prisma } from "@workspace/database-customer-karte";
import { fail, Result, succeed } from "@workspace/libs/result";

type UpdateCustomerParams = {
  customerId: string;
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  birthday: string;
  gender: "Man" | "Woman" | "Other";
  officeId: string;
};

export async function updateCustomer(
  params: UpdateCustomerParams,
): Promise<Result<{ customerId: string }>> {
  try {
    const customer = await prisma.customer.update({
      where: {
        customerId: params.customerId,
      },
      data: {
        firstName: params.firstName,
        lastName: params.lastName,
        firstNameKana: params.firstNameKana,
        lastNameKana: params.lastNameKana,
        birthday: new Date(`${params.birthday}T00:00:00+09:00`),
        gender: params.gender,
        officeId: params.officeId,
      },
    });
    return succeed({ customerId: customer.customerId });
  } catch (error) {
    console.error("顧客更新エラー:", error);
    return fail("顧客情報の更新に失敗しました");
  }
}
