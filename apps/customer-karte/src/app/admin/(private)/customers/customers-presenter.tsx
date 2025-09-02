import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import Link from "next/link";

import { Pagination } from "@/components/pagination";
import { calculateAge } from "@/lib/utils/age";
import { Prisma } from "@workspace/database-customer-karte";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

type CustomersPresenterProps = {
  customers?: Prisma.CustomerGetPayload<{
    include: {
      office: true;
    };
  }>[];
  totalPage?: number;
  page: number;
};

export function CustomersPresenter({
  customers = [],
  totalPage = 1,
  page,
}: CustomersPresenterProps) {
  return (
    <div>
      <div className="rounded-md mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[15%]">事業所</TableHead>
              <TableHead>名前</TableHead>
              <TableHead className="w-24">生年月日</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>電話番号</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  顧客が見つかりませんでした
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer.customerId}>
                  <TableCell className="h-14 break-all">
                    {customer.office.name}
                  </TableCell>
                  <TableCell className="h-14 break-all">
                    <Link
                      href={`/admin/customers/${customer.customerId}`}
                      className="hover:underline"
                    >
                      {customer.lastName} {customer.firstName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {customer.birthday
                      ? format(
                          new TZDate(customer.birthday, "Asia/Tokyo"),
                          "yyyy-MM-dd",
                        )
                      : "-"}
                  </TableCell>
                  <TableCell className="h-14 break-all">
                    {customer.emails[0] ? (
                      <a
                        href={`mailto:${customer.emails[0]}`}
                        className="text-blue-600 hover:underline"
                      >
                        {customer.emails[0]}
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="h-14 break-all">
                    {customer.phones[0] ? (
                      <a
                        href={`tel:${customer.phones[0]}`}
                        className="text-blue-600 hover:underline"
                      >
                        {customer.phones[0]}
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination page={page} totalPage={totalPage} />
    </div>
  );
}

export function CustomersTableSkeleton() {
  return (
    <div>
      <div className="rounded-md mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>事業所</TableHead>
              <TableHead>名前</TableHead>
              <TableHead>生年月日</TableHead>
              <TableHead>年齢</TableHead>
              <TableHead>メールアドレス</TableHead>
              <TableHead>電話番号</TableHead>
              <TableHead>住所</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="h-14">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell className="h-14">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell className="h-14">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell className="h-14">
                  <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell className="h-14">
                  <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <div className="h-9 w-64 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
