import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/lib/pagination";

import { getRoleLabel, User } from "../common/user";
import {
  DeleteUserDialog,
  DeleteUserDialogTrigger,
} from "../delete/delete-user-dialog";
import {
  EditUserDialog,
  EditUserDialogTrigger,
} from "../edit/edit-user-dialog";

type UsersPresenterProps = {
  users: User[];
  page: number;
  totalPage: number;
};
export function UsersPresenter({
  users,
  page,
  totalPage,
}: UsersPresenterProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名前</TableHead>
            <TableHead>メールアドレス</TableHead>
            <TableHead>ロール</TableHead>
            <TableHead className="w-14">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>
                {user.name || <span className="text-muted-foreground">-</span>}
              </TableCell>
              <TableCell>{user.email || "-"}</TableCell>
              <TableCell>{getRoleLabel(user.role)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="操作">
                      ...
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>操作メニュー</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <EditUserDialogTrigger user={user} />
                      <DeleteUserDialogTrigger user={user} />
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!users.length && (
        <div className="mt-8 text-center text-xs text-muted-foreground">
          ユーザーが見つかりません
        </div>
      )}
      <div className="mt-4">
        <Pagination page={page} totalPage={totalPage} />
      </div>

      <EditUserDialog />
      <DeleteUserDialog />
    </div>
  );
}
