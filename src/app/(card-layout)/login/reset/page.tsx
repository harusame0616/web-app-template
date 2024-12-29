import { Metadata } from "next";

import { Link } from "@/components/link";

import { ResetCard } from "./reset-card";

export const metadata: Metadata = {
  title: "パスワードリセット",
};

export default function Page() {
  return (
    <>
      <ResetCard />
      <div className="text-center">
        <Link href="/login">ログイン</Link>
      </div>
    </>
  );
}
