import { Edit } from "lucide-react";
import * as v from "valibot";

import { Link } from "@/components/link";
import { NextPageProps } from "@/lib/nextjs/next-page";
import { getCustomerBycustomerId } from "./customer";
import { DeleteCustomerDialog } from "./delete-customer-dialog";

export default async function CustomerDetailTitle({ params }: NextPageProps) {
  const { customerId } = v.parse(
    v.object({ customerId: v.string() }),
    await params,
  );

  // customerIdから顧客情報を取得してaliasIdを取得
  const customer = await getCustomerBycustomerId(customerId);

  if (!customer) {
    return <div>顧客情報が見つかりません</div>;
  }

  return (
    <div className="grid grid-cols-[1fr_auto] items-center">
      <div className="flex gap-2 items-center flex-wrap">顧客詳細</div>
      <div className="flex gap-4 flex-wrap">
        <Link
          href={`/admin/customers/${customerId}/edit`}
          className="flex items-center"
        >
          <Edit className="h-4 w-4 mr-1" />
          編集
        </Link>
        <DeleteCustomerDialog customerId={customerId} />
      </div>
    </div>
  );
}
