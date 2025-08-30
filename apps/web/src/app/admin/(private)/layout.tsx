import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { Toaster } from "@workspace/ui/components/sonner";
import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";

import { AppName } from "@/app-info";

import { SideMenuContainer, SideMenuPresenter } from "./side-menu";

export const metadata: Metadata = {
  title: {
    template: `%s | ${AppName}（Admin）`,
    default: `Admin | ${AppName}`,
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider className="flex" defaultOpen={false}>
      <Suspense fallback={<SideMenuPresenter skeleton />}>
        <SideMenuContainer />
      </Suspense>
      {children}
      <Toaster />
    </SidebarProvider>
  );
}
