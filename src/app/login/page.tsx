import Link from "next/link";
import { LoginCard } from "./login-card";

export default function Page() {
  return (
    <div className="flex flex-col h-full items-center p-4">
      <div className="flex-grow max-h-[80px]" />
      <div className="max-w-sm w-full flex flex-col items-center gap-6">
        <Link href="/" className="text-2xl font-bold">
          {process.env.NEXT_PUBLIC_SERVICE_NAME}
        </Link>
        <LoginCard />
        <Link href="/register" className="underline text-center">
          新規登録
        </Link>
      </div>
    </div>
  );
}
