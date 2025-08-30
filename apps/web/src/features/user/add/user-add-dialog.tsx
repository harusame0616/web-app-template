"use client";

import { Button } from "@workspace/ui/components/button";
import { UserPlus } from "lucide-react";
import { useId, useState } from "react";

import { Dialog } from "@/components/dialog";

import { UserInputForm } from "../common/user-input-form";
import { addUserAction } from "./actions";

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
