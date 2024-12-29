import { Metadata } from "next";
import Link from "next/link";

import { InvitationCard } from "./invitation-card";

export const metadata: Metadata = {
  title: "ユーザー登録",
};

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
