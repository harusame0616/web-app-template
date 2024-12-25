import { Suspense } from "react";
import { UsersTableContainer } from "./users-table-container";
import { UsersTablePresenter } from "./users-table-presenter";

type UsersPageProps = {
  page: number;
  searchParams: Record<string, string | string[] | undefined>;
};
export function UsersPage({ page, searchParams }: UsersPageProps) {
  return (
    <div>
      <Suspense fallback={<UsersTablePresenter page={page} skeleton />}>
        <UsersTableContainer page={page} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
