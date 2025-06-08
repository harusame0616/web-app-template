import { DialogClose } from "@radix-ui/react-dialog";
import { PropsWithChildren, ReactNode } from "react";

import { Button } from "./ui/button";
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

type DialogProps = {
  open: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  trigger?: ReactNode;
  primaryButtonLabel: string;
  description?: string;
  onPrimaryButtonClick?: () => void;
  formId?: string;
};
export function Dialog({
  open,
  trigger,
  onOpenChange,
  description,
  children,
  title,
  primaryButtonLabel,
  onPrimaryButtonClick,
  formId,
}: PropsWithChildren<DialogProps>) {
  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <Separator />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">閉じる</Button>
          </DialogClose>
          <Button onClick={onPrimaryButtonClick} type="submit" form={formId}>
            {primaryButtonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  );
}
