import { Suspense } from "react";
import { UserAddDialogContainer } from "./user-add-dialog-container";
import { UserAddDialog } from "./user-add-dialog";

export default function Title() {
  return (
    <div className="flex justify-between items-center">
      ユーザー一覧
      <Suspense fallback={<UserAddDialog offices={[]} />}>
        <UserAddDialogContainer />
      </Suspense>
    </div>
  );
}
