import { Metadata } from "next";
import Link from "next/link";

import { LoginCard } from "./login-card";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function Page() {
  return (
    <>
      <LoginCard />
      <Link href="/register" className="text-center underline">
        新規登録
      </Link>
    </>
  );
}
