"use client";

import { useState } from "react";

import { AlertDialog } from "@/components/alert-dialog";

import { deleteUserAction } from "./_actions";

type Props = {
  user: {
    name: string;
    email: string;
    userId: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteUserDialog({ user, open, onOpenChange }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <AlertDialog
      title="ユーザー削除"
      description={`ユーザー「${user.name}（${user.email}）」を削除します。よろしいですか？`}
      primaryButtonLabel="削除"
      open={open}
      primaryButtonDisabled={isDeleting}
      onPrimaryButtonClick={async () => {
        setIsDeleting(true);
        try {
          await deleteUserAction(user);
          onOpenChange(false);
        } finally {
          setIsDeleting(false);
        }
      }}
      onOpenChange={onOpenChange}
    />
  );
}
