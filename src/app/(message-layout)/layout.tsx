import Link from "next/link";
import { PropsWithChildren } from "react";

export default function NextLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center h-full p-4">
      <div className="flex-grow max-h-[80px]"></div>
      <div className="font-bold text-lg">
        <Link href="/">{process.env.NEXT_PUBLIC_SERVICE_NAME}</Link>
      </div>
      {children}
    </div>
  );
}
