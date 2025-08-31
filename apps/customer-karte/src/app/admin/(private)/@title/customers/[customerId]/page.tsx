import { Edit } from "lucide-react";
import * as v from "valibot";

import { Link } from "@/components/link";
import { NextPageProps } from "@/lib/nextjs/next-page";
import { DeleteCustomerDialog } from "./delete-customer-dialog";

export default async function CustomerDetailTitle({ params }: NextPageProps) {
  const { customerId } = v.parse(
    v.object({ customerId: v.string() }),
    await params,
  );

  return (
    <div className="grid grid-cols-[1fr_auto] items-center">
      <div>顧客詳細</div>
      <div className="flex gap-4 flex-wrap">
        <Link
          href={`/admin/customers/${customerId}/edit`}
          className="flex items-center"
        >
          <Edit className="size-4 mr-1" />
          編集
        </Link>
        <DeleteCustomerDialog customerId={customerId} />
      </div>
    </div>
  );
}
