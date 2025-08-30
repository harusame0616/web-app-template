import { Suspense } from "react";

import { OfficesContainer } from "./offices-table-container";
import { OfficesSkeleton } from "./offices-table-skeleton";

type OfficesPageProps = {
  page?: number;
};
export function OfficesPage({ page = 1 }: OfficesPageProps) {
  return (
    <Suspense fallback={<OfficesSkeleton page={page} />}>
      <OfficesContainer page={page} />
    </Suspense>
  );
}
