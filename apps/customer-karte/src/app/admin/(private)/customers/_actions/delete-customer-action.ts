"use server";

import * as v from "valibot";

import { createServerAction } from "@workspace/libs/server-action/server";
import { deleteCustomer } from "./delete-customer";

export const deleteCustomerAction = createServerAction(deleteCustomer, {
  inputSchema: v.object({
    customerId: v.string(),
  }),
  redirectTo: "/admin/customers",
});
