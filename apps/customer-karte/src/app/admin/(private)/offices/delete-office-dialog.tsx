"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { handleServerAction } from "@workspace/libs/server-action/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";

import { Office } from "@workspace/database-customer-karte";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { CircleAlertIcon } from "lucide-react";
import { deleteOfficeAction } from "./delete-office-action";

type DeleteOfficeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  office: Office;
};

export function DeleteOfficeDialog({
  open,
  onOpenChange,
  office,
}: DeleteOfficeDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);

    const result = await handleServerAction(
      deleteOfficeAction({
        officeId: office.officeId,
      }),
    );

    if (result.success) {
      onOpenChange(false);
      router.refresh();
    } else {
      setError(result.message);
    }

    setIsDeleting(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>事業所を削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            「{office.name}」を削除します。この操作は取り消せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            削除
          </AlertDialogAction>
        </AlertDialogFooter>

        {error && (
          <Alert variant="destructive">
            <CircleAlertIcon className="size-4" />
            <AlertTitle>エラー</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
