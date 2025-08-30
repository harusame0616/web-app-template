import { BuildingIcon } from "lucide-react";

import { Card } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { getCustomerInfo } from "./_data/customer";
import { Customer } from "../customer";
import { Office } from "../../offices/type";
import { notFound } from "next/navigation";

type CustomerInfoContainerProps = {
  customerId: string;
};

export async function CustomerInfoContainer({
  customerId,
}: CustomerInfoContainerProps) {
  const customerInfo = await getCustomerInfo(customerId);

  if (!customerInfo) {
    notFound();
  }

  return (
    <CustomerInfoPresenter
      customer={customerInfo.customer}
      office={customerInfo.office}
    />
  );
}

type CustomerInfoPresenterProps = {
  customer: Pick<
    Customer,
    "firstName" | "firstNameKana" | "lastName" | "lastNameKana"
  >;
  office: Pick<Office, "name">;
};

export function CustomerInfoPresenter({
  customer,
  office,
}: CustomerInfoPresenterProps) {
  return (
    <Card className="bg-gradient-to-r from-gray-50 to-white p-6 shadow">
      <div className="space-y-2">
        <div className="flex items-baseline gap-4">
          <h2 className="text-xl font-semibold">
            {customer.lastName} {customer.firstName}
          </h2>
          <div className="flex gap-6 text-sm text-muted-foreground">
            {customer.lastNameKana} {customer.firstNameKana}
          </div>
        </div>
        <div className="flex text-muted-foreground text-sm items-center gap-2">
          <BuildingIcon className="size-4" />
          {office.name}
        </div>
      </div>
    </Card>
  );
}

export function CustomerNameSkeleton() {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <div className="flex items-baseline gap-4">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-5 w-48" />
      </div>
    </div>
  );
}
