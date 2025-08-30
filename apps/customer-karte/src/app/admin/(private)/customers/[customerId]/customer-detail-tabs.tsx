"use client";

import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import Link from "next/link";

type CustomerDetailTabsProps = {
  customerId: string;
};

export function CustomerDetailTabs({ customerId }: CustomerDetailTabsProps) {
  const pathname = usePathname();
  const isNotesPage = pathname.includes("/notes");
  const activeTab = isNotesPage ? "notes" : "details";

  return (
    <Tabs value={activeTab} className="space-y-4">
      <TabsList className="w-full">
        <TabsTrigger value="details" asChild>
          <Link href={`/admin/customers/${customerId}`}>詳細</Link>
        </TabsTrigger>
        <TabsTrigger value="notes" asChild>
          <Link href={`/admin/customers/${customerId}/notes`}>接客ノート</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
