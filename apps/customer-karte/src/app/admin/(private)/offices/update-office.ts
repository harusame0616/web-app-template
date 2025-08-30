import { prisma } from "@workspace/database-customer-karte";

import { Result, succeed } from "@workspace/libs/result";

type UpdateOfficeParams = {
  officeId: string;
  name: string;
};

export async function updateOffice(
  params: UpdateOfficeParams,
): Promise<Result> {
  await prisma.office.update({
    where: {
      officeId: params.officeId,
    },
    data: {
      name: params.name,
    },
  });

  return succeed();
}
