import { prisma } from "@workspace/database-customer-karte";
import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { Role } from "../../users/role";

export async function getOffices(page: number) {
  const supabase = await createClient();
  const getUserResult = await supabase.auth.getUser();
  if (getUserResult.error || !getUserResult.data) {
    redirect("/admin/login");
  }

  if (getUserResult.data.user.user_metadata.role === Role.General.value) {
    notFound();
  }

  const perPage = 20;
  const skip = (page - 1) * perPage;

  const [offices, totalCount] = await Promise.all([
    prisma.office.findMany({
      skip,
      take: perPage,
    }),
    prisma.office.count(),
  ]);

  return {
    offices: offices.map((office) => ({
      officeId: office.officeId,
      name: office.name,
    })),
    totalPage: Math.ceil(totalCount / perPage),
  };
}

export async function getOfficeById(officeId: string) {
  const office = await prisma.office.findUnique({
    where: {
      officeId,
    },
  });

  if (!office) {
    return null;
  }

  return {
    officeId: office.officeId,
    name: office.name,
  };
}

export async function getAllOffices(): Promise<Office[]> {
  const offices = await prisma.office.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return offices.map((office) => ({
    officeId: office.officeId,
    name: office.name,
  }));
}
