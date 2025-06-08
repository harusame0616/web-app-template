import { PropsWithChildren } from "react";

import { AppName } from "@/app-info";
import { Link } from "@/components/link";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="max-h-[80px] grow" />
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Link href="/" className="text-2xl font-bold no-underline">
          {AppName}
        </Link>
        {children}
      </div>
    </div>
  );
}
