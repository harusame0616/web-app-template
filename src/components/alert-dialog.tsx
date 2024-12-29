import {
  AlertDialog as ShadcnAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "./ui/button";

type Props = {
  title: string;
  description: string;
  primaryButtonLabel: string;
  triggerLabel?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPrimaryButtonClick?: () => Promise<void>;
};
export function AlertDialog({
  title,
  description,
  triggerLabel,
  primaryButtonLabel,
  open,
  onOpenChange,
  onPrimaryButtonClick,
}: Props) {
  return (
    <ShadcnAlertDialog open={open} onOpenChange={onOpenChange}>
      {triggerLabel && <AlertDialogTrigger>{triggerLabel}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>閉じる</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onPrimaryButtonClick}>
              {primaryButtonLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ShadcnAlertDialog>
  );
}
