import { prisma } from "@workspace/database-customer-karte";

import { fail, Result, succeed } from "@workspace/libs/result";

export async function deleteInterview(
  noteId: string,
  customerId: string,
): Promise<Result<void>> {
  try {
    const interview = await prisma.prismaNote.findUnique({
      where: {
        noteId,
      },
    });

    if (!interview) {
      return fail("問診データが見つかりません");
    }

    if (interview.customerId !== customerId) {
      return fail("削除権限がありません");
    }

    await prisma.prismaNote.delete({
      where: {
        noteId,
      },
    });

    return succeed();
  } catch (error) {
    console.error("Failed to delete interview:", error);
    return fail("問診データの削除に失敗しました");
  }
}
