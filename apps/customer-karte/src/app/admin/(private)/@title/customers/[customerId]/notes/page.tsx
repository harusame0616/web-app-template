import * as v from "valibot";

import { NextPageProps } from "@/lib/nextjs/next-page";

import { getCustomerBycustomerId } from "../customer";

export default async function Default({ params }: NextPageProps) {
  const { customerId } = v.parse(
    v.object({ customerId: v.string() }),
    await params,
  );

  const customer = await getCustomerBycustomerId(customerId);

  if (!customer) {
    return <div>顧客情報が見つかりません</div>;
  }

  return <div>ノート一覧</div>;
}
