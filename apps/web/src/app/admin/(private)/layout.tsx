import { Metadata } from "next";
import { PropsWithChildren, ReactNode, Suspense } from "react";

import { AppName } from "@/app-info";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import { SideMenuContainer, SideMenuPresenter } from "./side-menu";

export const metadata: Metadata = {
  title: {
    template: `%s | ${AppName}（Admin）`,
    default: `Admin | ${AppName}`,
  },
};

export default function Layout({
  children,
  title,
}: PropsWithChildren<{ title?: ReactNode }>) {
  return (
    <SidebarProvider className="flex" defaultOpen={false}>
      <Suspense fallback={<SideMenuPresenter skeleton />}>
        <SideMenuContainer />
      </Suspense>
      <main className="grid grow grid-rows-[auto_1fr]">
        <div className="grid grid-cols-[auto_1fr] items-center px-4 h-12">
          <SidebarTrigger />
          {title}
          <div className="mx-4"></div>
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
