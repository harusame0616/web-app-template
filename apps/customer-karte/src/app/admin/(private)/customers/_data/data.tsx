import { type Prisma, prisma } from "@workspace/database-customer-karte";

import { CustomersSearchCondition } from "../customers-search-condition";
import { Customer } from "../customer";

export async function getCustomers({
  page,
  keyword,
  officeIds,
}: CustomersSearchCondition): Promise<{
  customers: Customer[];
  totalPage: number;
}> {
  const perPage = 20;
  const skip = (page - 1) * perPage;

  // 検索条件を構築
  const where: Prisma.PrismaCustomerWhereInput = {};

  // キーワード検索（名前の部分一致）
  if (keyword) {
    where.OR = [
      { firstName: { contains: keyword, mode: "insensitive" } },
      { lastName: { contains: keyword, mode: "insensitive" } },
    ];
  }

  if (officeIds?.length) {
    where.officeId = { in: officeIds };
  }

  const [customers, totalCount] = await Promise.all([
    prisma.customer.findMany({
      where,
      skip,
      take: perPage,
      orderBy: [
        {
          lastNameKana: "asc",
        },
        {
          firstNameKana: "asc",
        },
      ],
      include: {
        office: true,
        notes: {
          take: 1,
        },
      },
    }),
    prisma.customer.count({ where }),
  ]);

  return {
    customers: customers.map((customer) => ({
      ...customer,
    })),
    totalPage: Math.max(1, Math.ceil(totalCount / perPage)),
  };
}
