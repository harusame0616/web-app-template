import {
  prisma,
  PrismaClientKnownRequestError,
} from "@workspace/database-customer-karte";
import { uuidv7 as uuid } from "uuidv7";

import { fail, Result, succeed } from "@workspace/libs/result";

type CreateOfficeParams = {
  name: string;
};

export async function createOffice(
  params: CreateOfficeParams,
): Promise<Result> {
  try {
    await prisma.office.create({
      data: {
        officeId: uuid(),
        name: params.name,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return fail("すでに登録済みの名前です");
      }
    }

    throw error;
  }

  return succeed();
}
