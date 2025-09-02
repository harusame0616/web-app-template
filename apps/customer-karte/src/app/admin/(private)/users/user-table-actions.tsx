"use client";

import { Edit, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import { DeleteUserDialog } from "./delete-user-dialog";
import { EditUserDialog } from "./edit-user-dialog";
import { Role } from "./role";
import { Office } from "@workspace/database-customer-karte";

type Props = {
  user: {
    name: string;
    email: string;
    userId: string;
    role: Role;
    officeId: string;
  };
  offices: Office[];
};

export function UserTableActions({ user, offices }: Props) {
  const [editionUser, setEditionUser] = useState<{
    name: string;
    email: string;
    userId: string;
    role: Role;
    officeId: string;
  }>();
  const [deletionUser, setDeletionUser] = useState<{
    name: string;
    email: string;
    userId: string;
  }>();

  return (
    <>
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
            <DropdownMenuItem onClick={() => setEditionUser(user)}>
              <Edit />
              編集
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setDeletionUser({
                  name: user.name,
                  email: user.email,
                  userId: user.userId,
                })
              }
            >
              <Trash />
              削除
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {!!editionUser && (
        <EditUserDialog
          offices={offices}
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
      {!!deletionUser && (
        <DeleteUserDialog
          user={deletionUser}
          open
          onOpenChange={(open) => {
            if (!open) {
              setDeletionUser(undefined);
            }
          }}
        />
      )}
    </>
  );
}
