import { Suspense } from "react";

import { AdminPageLayout } from "@/components/admin-page-layout";

import { ExportButton } from "./export-button";
import { UserAddDialog } from "./user-add-dialog";
import { UsersTableContainer } from "./users-table-container";
import { UsersTablePresenter } from "./users-table-presenter";

type UsersPageProps = {
  page: number;
  searchParams: Record<string, string | string[] | undefined>;
};
export function UsersPage({ page, searchParams }: UsersPageProps) {
  return (
    <AdminPageLayout
      title="ユーザー一覧"
      toolBar={
        <>
          <ExportButton />
          <UserAddDialog />
        </>
      }
    >
      <Suspense fallback={<UsersTablePresenter page={page} skeleton />}>
        <UsersTableContainer page={page} searchParams={searchParams} />
      </Suspense>
    </AdminPageLayout>
  );
}
