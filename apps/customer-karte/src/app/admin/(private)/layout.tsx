import { PropsWithChildren, ReactNode, Suspense } from "react";

import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { Toaster } from "@workspace/ui/components/sonner";

import { SideMenuContainer, SideMenuPresenter } from "./side-menu";

export default function Layout({
  children,
  title,
}: PropsWithChildren<{ title?: ReactNode }>) {
  return (
    <SidebarProvider className="flex h-full" defaultOpen>
      <Suspense fallback={<SideMenuPresenter skeleton />}>
        <SideMenuContainer />
      </Suspense>
      <main className="grid grow grid-rows-[auto_1fr] overflow-y-hidden">
        <div className="grid items-center px-4 h-12 shadow-md">{title}</div>
        <div className="overflow-y-auto p-4 [scrollbar-gutter:stable]">
          {children}
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
