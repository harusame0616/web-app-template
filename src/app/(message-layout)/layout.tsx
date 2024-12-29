import Link from "next/link";
import { PropsWithChildren } from "react";

export default function NextLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="max-h-[80px] grow" />
      <div className="text-lg font-bold">
        <Link href="/">{process.env.NEXT_PUBLIC_SERVICE_NAME}</Link>
      </div>
      {children}
    </div>
  );
}
