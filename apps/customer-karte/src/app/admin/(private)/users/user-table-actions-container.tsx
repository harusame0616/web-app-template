import { prisma } from "@workspace/database-customer-karte";
import { UserTableActions } from "./user-table-actions";
import { Role } from "./role";

export async function UserTableActionsContainer({
  user,
}: {
  user: {
    name: string;
    email: string;
    userId: string;
    role: Role;
    officeId: string;
    officeName?: string;
  };
}) {
  const offices = await prisma.office.findMany();

  return <UserTableActions offices={offices} user={user} />;
}
