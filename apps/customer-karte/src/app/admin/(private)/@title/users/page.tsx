import { UserAddDialog } from "../../users/user-add-dialog";

export default function Title() {
  return (
    <div className="flex justify-between items-center">
      ユーザー一覧
      <UserAddDialog />
    </div>
  );
}
