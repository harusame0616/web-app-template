import { Pagination } from "@/components/pagination";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

import { User } from "./_data/user";
import { Role } from "./role";
import { UserTableActionsContainer } from "./user-table-actions-container";

type UsersTablePresenterProps =
  | {
      users: User[];
      page: number;
      totalPage: number;
      skeleton: false;
    }
  | {
      skeleton: true;
      page: number;
    };
export function UsersTablePresenter(props: UsersTablePresenterProps) {
  const page = props.page;
  const totalPage = props.skeleton ? 1 : props.totalPage;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名前</TableHead>
            <TableHead>メールアドレス</TableHead>
            <TableHead>営業所</TableHead>
            <TableHead>ロール</TableHead>
            <TableHead className="w-14">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(props.skeleton
            ? Array.from({ length: 10 }).map(() => ({
                name: "",
                email: "",
                userId: "",
                role: Role.General.value,
                officeId: "",
                officeName: "",
              }))
            : props.users
          ).map(({ userId, email, name, role, officeId, officeName }, i) => (
            <TableRow key={userId || i}>
              <TableCell className="py-4">
                {props.skeleton ? (
                  <Skeleton className="h-5 w-24" />
                ) : (
                  name || <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="py-4">
                {props.skeleton ? <Skeleton className="h-5 w-48" /> : email}
              </TableCell>
              <TableCell className="py-4">
                {props.skeleton ? (
                  <Skeleton className="h-5 w-24" />
                ) : (
                  officeName || <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="py-4">
                {props.skeleton ? (
                  <Skeleton className="h-5 w-16" />
                ) : (
                  formatRole(role)
                )}
              </TableCell>
              <TableCell className="py-4">
                {!props.skeleton && (
                  <UserTableActionsContainer
                    user={{ name, email, userId, role, officeId, officeName }}
                  />
                )}
                {props.skeleton && <Skeleton className="h-8 w-8" />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!props.skeleton && !props.users.length && (
        <div className="mt-8 text-center text-xs text-muted-foreground">
          ユーザーが見つかりません
        </div>
      )}
      <div className="mt-4">
        <Pagination page={page} totalPage={totalPage} />
      </div>
    </div>
  );
}

function formatRole(role: Role) {
  switch (role) {
    case Role.Admin.value: {
      return "管理者";
    }
    case Role.General.value: {
      return "一般";
    }
    default: {
      // フォールバック
      return "管理者";
    }
  }
}
