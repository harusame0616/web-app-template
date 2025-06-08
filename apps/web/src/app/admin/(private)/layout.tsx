import { Metadata } from "next";
import { PropsWithChildren, ReactNode, Suspense } from "react";

import { AppName } from "@/app-info";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
    <SidebarProvider className="flex">
      <Suspense fallback={<SideMenuPresenter skeleton />}>
        <SideMenuContainer />
      </Suspense>
      <main className="grid grow grid-rows-[auto_1fr]">
        <div className="grid grid-cols-[auto_1fr] items-center">
          <SidebarTrigger />
          <h1 className="p-2">{title}</h1>
        </div>
        <div className="overflow-y-auto p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
