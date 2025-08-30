"use client";

import { DropdownMenuItem } from "@workspace/ui/components/dropdown-menu";
import { Edit } from "lucide-react";
import { useId } from "react";

import { Dialog } from "@/components/dialog";

import { User } from "../common/user";
import { UserInputForm } from "../common/user-input-form";
import { editUserAction } from "./actions";
import { useUserEditDialog } from "./use-edit-user-dialog";

export function EditUserDialog() {
  const formId = useId();
  const editUserDialog = useUserEditDialog();

  if (!editUserDialog.isOpen) {
    return null;
  }

  return (
    <Dialog
      title="ユーザー編集"
      onOpenChange={(open) => {
        if (open) {
          return;
        }

        editUserDialog.closeDialog();
      }}
      open
      primaryButtonLabel="保存"
      formId={formId}
    >
      <UserInputForm
        formId={formId}
        onSuccess={() => editUserDialog.closeDialog()}
        action={(params) =>
          editUserAction({ ...params, userId: editUserDialog.user.userId })
        }
        user={editUserDialog.user}
      />
    </Dialog>
  );
}

type EditUserDialogTriggerProps = {
  user: User;
};

export function EditUserDialogTrigger({ user }: EditUserDialogTriggerProps) {
  const dialog = useUserEditDialog();

  return (
    <DropdownMenuItem
      onSelect={() => {
        if (dialog.isOpen) {
          return;
        }
        dialog.openDialog(user);
      }}
    >
      <Edit />
      編集
    </DropdownMenuItem>
  );
}
