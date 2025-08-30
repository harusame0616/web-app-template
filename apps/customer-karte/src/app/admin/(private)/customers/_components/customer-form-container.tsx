import { notFound } from "next/navigation";
import { getAllOffices } from "../../offices/_data/office";
import { getCustomerDetail } from "../[customerId]/_data/customer";
import { CustomerForm } from "./customer-form";

type CustomerFormContainerProps = {
  customerId?: string;
};

export async function CustomerFormContainer({
  customerId,
}: CustomerFormContainerProps) {
  const offices = await getAllOffices();
  if (customerId) {
    const customer = await getCustomerDetail(customerId);

    if (!customer) {
      notFound();
    }

    return <CustomerForm customer={customer} offices={offices} />;
  }

  return <CustomerForm offices={offices} />;
}
