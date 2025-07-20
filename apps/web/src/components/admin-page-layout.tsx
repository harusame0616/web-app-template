import { PropsWithChildren, ReactNode } from "react";
import { SidebarTrigger } from "./ui/sidebar";

type Props = PropsWithChildren<{
  title: string;
  toolBar: ReactNode;
}>;
export function AdminPageLayout({ title, toolBar, children }: Props) {
  return (
    <main className="grid grow grid-rows-[auto_1fr]">
      <div className="flex items-center px-4 h-12 gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex-1 flex justify-end gap-4">
          {toolBar}
        </div>
      </div>
      <div className="overflow-y-auto p-4">{children}</div>
    </main>
  );
}
