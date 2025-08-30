import { getUsers } from "./_data/user";
import { UsersTablePresenter } from "./users-table-presenter";

type UsersTableContainerProps = {
  page: number;
};
export async function UsersTableContainer({ page }: UsersTableContainerProps) {
  const { totalPage, users } = await getUsers(page);

  return (
    <UsersTablePresenter
      users={users}
      totalPage={totalPage}
      page={page}
      skeleton={false}
    />
  );
}
