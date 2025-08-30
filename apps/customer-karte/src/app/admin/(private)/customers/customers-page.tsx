import { Suspense } from "react";

import { CustomersContainer } from "./customers-container";
import { CustomersTableSkeleton } from "./customers-presenter";
import { CustomersSearchCondition } from "./customers-search-condition";
import { CustomersSearchContainer } from "./customers-search-container";
import { CustomersSearchForm } from "./customers-search-form";

type CustomersPageProps = {
  condition: CustomersSearchCondition;
};

export function CustomersPage({ condition }: CustomersPageProps) {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <CustomersSearchForm
            key={"search-" + JSON.stringify(condition)}
            condition={condition}
            offices={[]}
          />
        }
      >
        <CustomersSearchContainer condition={condition} />
      </Suspense>
      <Suspense
        fallback={<CustomersTableSkeleton />}
        key={"list" + JSON.stringify(condition)}
      >
        <CustomersContainer condition={condition} />
      </Suspense>
    </div>
  );
}
