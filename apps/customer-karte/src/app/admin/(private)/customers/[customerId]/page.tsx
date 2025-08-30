import { Metadata } from "next";
import { Suspense } from "react";
import * as v from "valibot";

import { NextPageProps } from "@/lib/nextjs/next-page";

import { CustomerDetailContainer } from "./customer-detail";
import { CustomerDetailSkeleton } from "./customer-detail-skeleton";

export const metadata: Metadata = {
  title: "顧客詳細",
};

export default async function Page({ params }: NextPageProps) {
  const { customerId } = v.parse(
    v.object({
      customerId: v.string(),
    }),
    await params,
  );

  return (
    <Suspense fallback={<CustomerDetailSkeleton />}>
      <CustomerDetailContainer customerId={customerId} />
    </Suspense>
  );
}
