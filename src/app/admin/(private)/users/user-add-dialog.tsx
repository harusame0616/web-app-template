"use client";

import { UserPlus } from "lucide-react";
import { useId, useState } from "react";

import { Dialog } from "@/components/dialog";
import { Button } from "@/components/ui/button";

import { addUserAction } from "./_actions";
import { UserInputForm } from "./user-input-form";

export function UserAddDialog() {
  const [open, setOpen] = useState(false);

  const formId = useId();

  return (
    <Dialog
      title="ユーザー追加"
      trigger={
        <Button variant="ghost">
          <UserPlus />
          ユーザー追加
        </Button>
      }
      onOpenChange={setOpen}
      open={open}
      primaryButtonLabel="保存"
      formId={formId}
    >
      <UserInputForm
        action={addUserAction}
        formId={formId}
        onSuccess={() => setOpen(false)}
      />
    </Dialog>
  );
}
