import { BuildingIcon } from "lucide-react";

import { prisma, Prisma } from "@workspace/database-customer-karte";
import { Card } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { notFound } from "next/navigation";

type CustomerInfo = Prisma.CustomerGetPayload<{
  select: {
    firstName: true;
    lastName: true;
    firstNameKana: true;
    lastNameKana: true;
    office: {
      select: {
        name: true;
      };
    };
  };
}>;

export async function getCustomerInfo(
  customerId: string,
): Promise<CustomerInfo | null> {
  const customer = await prisma.customer.findUnique({
    select: {
      firstName: true,
      lastName: true,
      firstNameKana: true,
      lastNameKana: true,
      office: {
        select: {
          name: true,
        },
      },
    },
    where: {
      customerId,
    },
  });

  if (!customer || !customer.office) {
    return null;
  }

  return customer;
}

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

  return <CustomerInfoPresenter customerInfo={customerInfo} />;
}

type CustomerInfoPresenterProps = {
  customerInfo: CustomerInfo;
};

export function CustomerInfoPresenter({
  customerInfo: {
    firstName,
    lastName,
    firstNameKana,
    lastNameKana,
    office: { name: officeName },
  },
}: CustomerInfoPresenterProps) {
  return (
    <Card className="bg-gradient-to-r from-gray-50 to-white p-6 shadow">
      <div className="space-y-2">
        <div className="flex items-baseline gap-4">
          <h2 className="text-xl font-semibold">
            {lastName} {firstName}
          </h2>
          <div className="flex gap-6 text-sm text-muted-foreground">
            {lastNameKana} {firstNameKana}
          </div>
        </div>
        <div className="flex text-muted-foreground text-sm items-center gap-2">
          <BuildingIcon className="size-4" />
          {officeName}
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
