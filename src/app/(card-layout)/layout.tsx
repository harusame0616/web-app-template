import Link from "next/link";
import { LoginCard } from "./login/login-card";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="max-h-[80px] grow" />
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Link href="/" className="text-2xl font-bold">
          {process.env.NEXT_PUBLIC_SERVICE_NAME}
        </Link>
        {children}
      </div>
    </div>
  );
}
