import { Metadata } from "next";
import { PropsWithChildren, ReactNode, Suspense } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { SideMenuContainer, SideMenuPresenter } from "./side-menu";

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SERVICE_NAME}（Admin）`,
    default: `管理画面 ${process.env.NEXT_PUBLIC_SERVICE_NAME}`,
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
