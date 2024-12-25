import { PropsWithChildren, ReactNode } from "react";
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { DialogClose } from "@radix-ui/react-dialog";

type DialogProps = {
  open: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  trigger?: ReactNode;
  primaryButtonLabel: string;
  onPrimaryButtonClick?: () => void;
  formId?: string;
};
export function Dialog({
  open,
  trigger,
  onOpenChange,
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
          <DialogDescription></DialogDescription>
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
