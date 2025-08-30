import { Metadata } from "next";
import { Suspense } from "react";
import { CustomerForm } from "../_components/customer-form";
import { CustomerFormContainer } from "../_components/customer-form-container";

export const metadata: Metadata = {
  title: "顧客新規作成",
};

export default function NewCustomerPage() {
  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<CustomerForm offices={[]} />}>
        <CustomerFormContainer />
      </Suspense>
    </div>
  );
}
