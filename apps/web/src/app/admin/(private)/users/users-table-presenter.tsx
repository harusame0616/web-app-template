"use client";

import { Edit, Trash } from "lucide-react";
import { useState } from "react";

import { AlertDialog } from "@/components/alert-dialog";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { deleteUserAction } from "./_actions";
import { User } from "./_data/user";
import { UserEditDialog } from "./user-edit-dialog";

type UsersTablePresenterProps =
  | {
      users: User[];
      page: number;
      totalPage: number;
      skeleton: false;
      searchParams: Record<string, string | string[] | undefined>;
    }
  | {
      skeleton: true;
      page: number;
    };
export function UsersTablePresenter(props: UsersTablePresenterProps) {
  const [editionUser, setEditionUser] = useState<{
    name: string;
    email: string;
    userId: string;
    role: "admin" | "operator" | "viewer";
  }>();
  const [deletionUser, setDeletionUser] = useState<{
    name: string;
    email: string;
    userId: string;
  }>();

  const page = props.page;
  const totalPage = props.skeleton ? 1 : props.totalPage;
  const searchParams = props.skeleton ? {} : props.searchParams;
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
          {(props.skeleton
            ? Array.from({ length: 10 }).map(() => ({
                name: "",
                email: "",
                userId: "",
                role: "viewer" as const,
              }))
            : props.users
          ).map(({ userId, email, name, role }, i) => (
            <TableRow key={userId || i}>
              <TableCell>
                {props.skeleton ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  name || <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                {props.skeleton ? <Skeleton className="h-4 w-10" /> : email}
              </TableCell>
              <TableCell>
                {props.skeleton ? (
                  <Skeleton className="h-4 w-10" />
                ) : (
                  {
                    viewer: "閲覧者",
                    operator: "オペレーター",
                    admin: "管理者",
                  }[role]
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="操作"
                      disabled={props.skeleton}
                    >
                      ...
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>操作メニュー</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() =>
                          setEditionUser({ name, email, userId, role })
                        }
                      >
                        <Edit />
                        編集
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletionUser({ name, email, userId })}
                      >
                        <Trash />
                        削除
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
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
        <Pagination
          page={page}
          totalPage={totalPage}
          searchParams={searchParams}
        />
      </div>

      {!!editionUser && (
        <UserEditDialog
          title="ユーザー編集"
          onOpenChange={(open) => {
            if (!open) {
              setEditionUser(undefined);
            }
          }}
          open
          primaryButtonLabel="保存"
          {...editionUser}
        />
      )}
      <AlertDialog
        title="ユーザー削除"
        description={`ユーザー「${deletionUser?.name}（${deletionUser?.email}）」を削除します。よろしいですか？`}
        primaryButtonLabel="削除"
        open={!!deletionUser}
        onPrimaryButtonClick={async () => {
          if (deletionUser) {
            await deleteUserAction(deletionUser);
          }
        }}
        onOpenChange={(open) => {
          if (!open) {
            setDeletionUser(undefined);
          }
        }}
      />
    </div>
  );
}
