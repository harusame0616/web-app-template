"use client";

import { Dialog } from "@/components/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { User } from "./data/user";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/pagination";

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
            <TableHead className="w-14">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(props.skeleton
            ? Array.from({ length: 10 }).map(() => ({
                name: "",
                email: "",
                userId: "",
              }))
            : props.users
          ).map(({ userId, email, name }, i) => (
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
                        onClick={() => setEditDialogOpen(!editDialogOpen)}
                      >
                        <Edit />
                        編集
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteDialogOpen(!deleteDialogOpen)}
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
        <div className="text-muted-foreground mt-8 text-center text-xs">
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

      <Dialog
        title="Are you absolutely sure?"
        onClose={() => {}}
        onOpenChange={setEditDialogOpen}
        open={editDialogOpen}
      >
        edit
      </Dialog>
      <Dialog
        title="Are you absolutely sure?"
        onClose={() => {}}
        onOpenChange={setDeleteDialogOpen}
        open={deleteDialogOpen}
      >
        delete
      </Dialog>
    </div>
  );
}
