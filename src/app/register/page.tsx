import Link from "next/link";
import { InvitationCard } from "./invitation-card";

export const maxDuration = 60;

export default function Page() {
  return (
    <div className="flex flex-col h-full items-center p-4">
      <div className="flex-grow max-h-[80px]" />
      <div className="max-w-sm w-full">
        <div className="text-center text-2xl font-bold mb-4">
          <Link href="/">{process.env.NEXT_PUBLIC_SERVICE_NAME}</Link>
        </div>
        <InvitationCard />
        <div className="mt-4 flex justify-center">
          <Link href="/login" className="underline">
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
