import { prisma } from "@workspace/database-customer-karte";

import { Result, succeed } from "@workspace/libs/result";

type DeleteOfficeParams = {
  officeId: string;
};

export async function deleteOffice(
  params: DeleteOfficeParams,
): Promise<Result> {
  await prisma.office.delete({
    where: {
      officeId: params.officeId,
    },
  });

  return succeed();
}
