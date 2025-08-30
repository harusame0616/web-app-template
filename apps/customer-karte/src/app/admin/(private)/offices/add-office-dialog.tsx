"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { handleServerAction } from "@workspace/libs/server-action/client";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

import { addOfficeAction } from "./add-office-action";
import { OfficeInputForm } from "./office-input-form";

export function OfficeAddDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: { name: string }) => {
    const result = await handleServerAction(
      addOfficeAction({
        name: data.name,
      }),
    );

    if (result.success) {
      setOpen(false);
      router.refresh();
    }

    return result;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="size-4" />
          追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>事業所追加</DialogTitle>
        </DialogHeader>
        <OfficeInputForm onSubmit={handleSubmit} submitLabel="追加" />
      </DialogContent>
    </Dialog>
  );
}
