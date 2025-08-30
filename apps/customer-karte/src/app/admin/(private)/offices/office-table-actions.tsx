"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import { DeleteOfficeDialog } from "./delete-office-dialog";
import { EditOfficeDialog } from "./edit-office-dialog";
import { Office } from "@workspace/database-customer-karte";

type OfficeTableActionsProps = {
  office: Office;
};
export function OfficeTableActions({ office }: OfficeTableActionsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            編集
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditOfficeDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        office={office}
      />
      <DeleteOfficeDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        office={office}
      />
    </>
  );
}
