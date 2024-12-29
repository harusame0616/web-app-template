import { ComponentProps, useId } from "react";

import { Dialog } from "@/components/dialog";

import { editUserAction } from "./_actions";
import { Role } from "./role";
import { UserInputForm } from "./user-input-form";

type Props = Omit<ComponentProps<typeof Dialog>, "children"> & {
  userId: string;
  name: string;
  email: string;
  role: Role;
};
export function UserEditDialog({
  open,
  onOpenChange,
  name,
  email,
  userId,
  role,
}: Props) {
  const formId = useId();

  return (
    <Dialog
      title="ユーザー編集"
      onOpenChange={onOpenChange}
      open={open}
      primaryButtonLabel="保存"
      formId={formId}
    >
      <UserInputForm
        formId={formId}
        onSuccess={() => onOpenChange(false)}
        action={(params) => editUserAction({ ...params, userId })}
        user={{ email, name, role, userId }}
      />
    </Dialog>
  );
}
