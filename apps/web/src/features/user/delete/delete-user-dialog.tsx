"use client";

import { Trash } from "lucide-react";

import { AlertDialog } from "@/components/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { User } from "../common/user";
import { deleteUserAction } from "./actions";
import { useDeleteUserDialog } from "./use-delete-user-dialog";

export function DeleteUserDialog() {
  const deleteDialog = useDeleteUserDialog();

  if (!deleteDialog.isOpen) {
    return null;
  }

  return (
    <AlertDialog
      title="ユーザー削除"
      description={`ユーザー「${deleteDialog.user.name}（${deleteDialog.user.email}）」を削除します。よろしいですか？`}
      primaryButtonLabel="削除"
      open
      onPrimaryButtonClick={async () => {
        await deleteUserAction({ userId: deleteDialog.user.userId });
        deleteDialog.closeDialog();
      }}
      onOpenChange={(open) => {
        if (open) {
          return;
        }
        deleteDialog.closeDialog();
      }}
    />
  );
}

type DeleteUserDialogTriggerProps = {
  user: Omit<User, "role">;
};

export function DeleteUserDialogTrigger({
  user,
}: DeleteUserDialogTriggerProps) {
  const deleteUserDialog = useDeleteUserDialog();

  return (
    <DropdownMenuItem
      className="text-red-600 focus:text-red-600"
      onSelect={() => {
        if (deleteUserDialog.isOpen) {
          return;
        }

        deleteUserDialog.openDialog(user);
      }}
    >
      <Trash />
      削除
    </DropdownMenuItem>
  );
}
