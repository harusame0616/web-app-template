import Link from "next/link";
import { InvitationCard } from "./invitation-card";

export const maxDuration = 60;

export default function Page() {
  return (
    <>
      <InvitationCard />
      <div className="mt-4 flex justify-center">
        <Link href="/login" className="underline">
          ログイン
        </Link>
      </div>
    </>
  );
}
