"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Alert, AlertTitle } from "@workspace/ui/components/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import { handleServerAction } from "@workspace/libs/server-action/client";
import { deleteCustomerAction } from "../../../customers/_actions/delete-customer-action";

type DeleteCustomerDialogProps = {
  customerId: string;
};

export function DeleteCustomerDialog({
  customerId,
}: DeleteCustomerDialogProps) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setErrorMessage("");
    startTransition(async () => {
      const result = await handleServerAction(
        deleteCustomerAction({ customerId }),
      );

      if (result.success) {
        setOpen(false);
        router.push("/admin/customers");
      } else {
        setErrorMessage(result.message);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="size-4 mr-1" />
          削除
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>顧客を削除しますか？</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <div>この操作は取り消すことができません。</div>
            <div>削除されたデータは復元できません。</div>
            <div>
              関連するデータ（問診履歴など）が存在する場合は削除できません。
            </div>
          </AlertDialogDescription>
          {errorMessage && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "削除中..." : "削除する"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
