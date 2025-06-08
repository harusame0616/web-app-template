import { PropsWithChildren } from "react";

import { AppName } from "@/app-info";
import { Link } from "@/components/link";

export default function NextLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="max-h-[80px] grow" />
      <Link href="/" className="text-lg font-bold no-underline">
        {AppName}
      </Link>

      {children}
    </div>
  );
}
