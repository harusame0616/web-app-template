import { prisma } from "@workspace/database-customer-karte";
import { ComponentProps } from "react";
import { CustomerInfoPresenter } from "../customer-info";
import { Customer } from "../../customer";

export async function getCustomerDetail(
  customerId: string,
): Promise<Customer | null> {
  const customer = await prisma.customer.findUnique({
    where: { customerId },
  });

  if (!customer) {
    return null;
  }

  return customer;
}

export async function getCustomerInfo(
  customerId: string,
): Promise<ComponentProps<typeof CustomerInfoPresenter> | null> {
  const customer = await prisma.customer.findUnique({
    include: {
      office: true,
    },
    where: {
      customerId,
    },
  });

  if (!customer) {
    return null;
  }

  return customer;
}
