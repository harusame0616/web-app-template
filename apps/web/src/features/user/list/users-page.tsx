import { Suspense } from "react";

import { AdminPageLayout } from "@/components/admin-page-layout";

import { UserAddDialog } from "../add/user-add-dialog";
import { UsersContainer } from "./users-container";
import { UsersSkeleton } from "./users-skeleton";

type UsersPageProps = {
  page: number;
};
export function UsersPage({ page }: UsersPageProps) {
  return (
    <AdminPageLayout title="ユーザー一覧" toolBar={<UserAddDialog />}>
      <Suspense fallback={<UsersSkeleton page={page} />}>
        <UsersContainer page={page} />
      </Suspense>
    </AdminPageLayout>
  );
}
