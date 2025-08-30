import { prisma } from "@workspace/database-customer-karte";

import { fail, succeed } from "@workspace/libs/result";

export async function deleteCustomer({ customerId }: { customerId: string }) {
  try {
    await prisma.customer.delete({
      where: {
        customerId,
      },
    });
  } catch (error) {
    console.error("Failed to delete customer:", error);
    if (
      error instanceof Error &&
      error.message.includes("foreign key constraint")
    ) {
      return fail("関連するデータが存在するため削除できません");
    }
    return fail("顧客の削除に失敗しました");
  }

  return succeed({ x: "test" });
}
