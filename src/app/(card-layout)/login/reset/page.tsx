import Link from "next/link";
import { ResetCard } from "./reset-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "パスワードリセット",
};

export default function Page() {
  return (
    <>
      <ResetCard />
      <div className="mt-4 flex justify-center">
        <Link href="/signin" className="underline">
          ログイン
        </Link>
      </div>
    </>
  );
}
