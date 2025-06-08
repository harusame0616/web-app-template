import { getUsers } from "./_data/user";
import { UsersTablePresenter } from "./users-table-presenter";

type UsersTableContainerProps = {
  page: number;
  searchParams: Record<string, string | string[] | undefined>;
};
export async function UsersTableContainer({
  page,
  searchParams,
}: UsersTableContainerProps) {
  const { totalPage, users } = await getUsers(page);

  return (
    <UsersTablePresenter
      users={users}
      totalPage={totalPage}
      page={page}
      searchParams={searchParams}
      skeleton={false}
    />
  );
}
