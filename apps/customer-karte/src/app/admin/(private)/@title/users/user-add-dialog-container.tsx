import { prisma } from "@workspace/database-customer-karte";
import { UserAddDialog } from "./user-add-dialog";

export async function UserAddDialogContainer() {
  const offices = await prisma.office.findMany();

  return <UserAddDialog offices={offices} />;
}
