import { prisma } from "@workspace/database-customer-karte";
import { Result, succeed } from "@workspace/libs/result";

type UpdateCustomerParams = {
  customerId: string;
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  birthday: string | null;
  gender: "Man" | "Woman" | "Other";
  officeId: string;
  emails: string[];
  phones: string[];
  addresses: string[];
  remarks: string;
};

export async function updateCustomer(
  params: UpdateCustomerParams,
): Promise<Result<{ customerId: string }>> {
  const customer = await prisma.customer.update({
    where: {
      customerId: params.customerId,
    },
    data: {
      firstName: params.firstName,
      lastName: params.lastName,
      firstNameKana: params.firstNameKana,
      lastNameKana: params.lastNameKana,
      birthday: params.birthday
        ? new Date(`${params.birthday}T00:00:00+09:00`)
        : null,
      gender: params.gender,
      officeId: params.officeId,
      emails: params.emails,
      phones: params.phones,
      addresses: params.addresses,
      remarks: params.remarks,
    },
  });
  return succeed({ customerId: customer.customerId });
}
