import Link from "next/link";
import { LoginCard } from "./login/login-card";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-full items-center p-4">
      <div className="flex-grow max-h-[80px]" />
      <div className="max-w-sm w-full flex flex-col items-center gap-6">
        <Link href="/" className="text-2xl font-bold">
          {process.env.NEXT_PUBLIC_SERVICE_NAME}
        </Link>
        {children}
      </div>
    </div>
  );
}
