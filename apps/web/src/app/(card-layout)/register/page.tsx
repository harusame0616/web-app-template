import { Metadata } from "next";

import { Link } from "@/components/link";

import { InvitationCard } from "./invitation-card";

export const metadata: Metadata = {
  title: "ユーザー登録",
};

export default function Page() {
  return (
    <>
      <InvitationCard />
      <div className="text-center">
        <Link href="/login">ログイン</Link>
      </div>
    </>
  );
}
