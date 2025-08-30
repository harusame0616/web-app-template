import { Metadata } from "next";
import { Suspense } from "react";
import * as v from "valibot";

import { NextPageProps } from "@/lib/nextjs/next-page";

import { CustomerForm } from "../../_components/customer-form";
import { CustomerFormContainer } from "../../_components/customer-form-container";

export const metadata: Metadata = {
  title: "顧客編集",
};

export default async function EditCustomerPage({ params }: NextPageProps) {
  const { customerId } = v.parse(
    v.object({ customerId: v.string() }),
    await params,
  );

  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<CustomerForm offices={[]} />}>
        <CustomerFormContainer customerId={customerId} />
      </Suspense>
    </div>
  );
}
