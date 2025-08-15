import { getUsers } from "./data";
import { UsersPresenter } from "./users-presenter";

type UsersContainerProps = {
  page: number;
};
export async function UsersContainer({ page }: UsersContainerProps) {
  const { totalPage, users } = await getUsers(page);

  return <UsersPresenter users={users} totalPage={totalPage} page={page} />;
}
