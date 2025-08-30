import React, { Suspense } from "react";

import { CustomerDetailTabs } from "./customer-detail-tabs";
import { CustomerInfoContainer, CustomerNameSkeleton } from "./customer-info";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  return (
    <div className="space-y-4">
      <Suspense fallback={<CustomerNameSkeleton />}>
        <CustomerInfoContainer customerId={customerId} />
      </Suspense>
      <CustomerDetailTabs customerId={customerId} />
      {children}
    </div>
  );
}
