import { prisma } from "@workspace/database-customer-karte";
import { notFound } from "next/navigation";
import { getAllOffices } from "../../offices/_data/office";
import { CustomerForm } from "./customer-form";

async function getCustomer(customerId: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });

  return customer;
}

type CustomerFormContainerProps = {
  customerId?: string;
};

export async function CustomerFormContainer({
  customerId,
}: CustomerFormContainerProps) {
  const offices = await getAllOffices();

  if (customerId) {
    const customer = await getCustomer(customerId);

    if (!customer) {
      notFound();
    }

    return <CustomerForm customer={customer} offices={offices} />;
  }

  return <CustomerForm offices={offices} />;
}
