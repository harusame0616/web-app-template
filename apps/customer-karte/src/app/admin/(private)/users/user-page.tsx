import { Suspense } from "react";

import { UsersTableContainer } from "./users-table-container";
import { UsersTablePresenter } from "./users-table-presenter";

type UsersPageProps = {
  page?: number;
};
export function UsersPage({ page = 1 }: UsersPageProps) {
  return (
    <Suspense fallback={<UsersTablePresenter page={page} skeleton />}>
      <UsersTableContainer page={page} />
    </Suspense>
  );
}
