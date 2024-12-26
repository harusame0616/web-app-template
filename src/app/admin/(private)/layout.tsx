import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PropsWithChildren, ReactNode, Suspense } from "react";
import { SideMenuContainer, SideMenuPresenter } from "./side-menu";

export default function Layout({
  children,
  title,
}: PropsWithChildren<{ title?: ReactNode }>) {
  return (
    <SidebarProvider className="flex">
      <Suspense fallback={<SideMenuPresenter skeleton/>}>
        <SideMenuContainer />
      </Suspense>
      <main className="grid grid-rows-[auto_1fr] flex-grow">
        <div className="grid grid-cols-[auto_1fr] items-center">
          <SidebarTrigger />
          <h1 className="p-2">{title}</h1>
        </div>
        <div className="p-4 overflow-y-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
