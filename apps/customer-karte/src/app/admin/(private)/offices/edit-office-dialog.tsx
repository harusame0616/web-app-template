import { useRouter } from "next/navigation";

import { handleServerAction } from "@workspace/libs/server-action/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";

import { Office } from "@workspace/database-customer-karte";
import { OfficeInputForm } from "./office-input-form";
import { updateOfficeAction } from "./update-office-action";

type EditOfficeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  office: Office;
};

export function EditOfficeDialog({
  open,
  onOpenChange,
  office,
}: EditOfficeDialogProps) {
  const router = useRouter();

  const handleSubmit = async (data: { name: string }) => {
    const result = await handleServerAction(
      updateOfficeAction({
        officeId: office.officeId,
        name: data.name,
      }),
    );

    if (result.success) {
      onOpenChange(false);
      router.refresh();
    }

    return result;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>事業所編集</DialogTitle>
        </DialogHeader>
        <OfficeInputForm
          office={office}
          onSubmit={handleSubmit}
          submitLabel="更新"
        />
      </DialogContent>
    </Dialog>
  );
}
