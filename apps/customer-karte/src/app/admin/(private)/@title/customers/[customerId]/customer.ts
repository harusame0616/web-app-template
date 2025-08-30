import { prisma } from "@workspace/database-customer-karte";

export function getCustomerBycustomerId(customerId: string) {
  return prisma.customer.findUnique({
    where: { customerId },
  });
}
