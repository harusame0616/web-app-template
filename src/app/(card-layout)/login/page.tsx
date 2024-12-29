import { Metadata } from "next";

import { Link } from "@/components/link";

import { LoginCard } from "./login-card";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function Page() {
  return (
    <>
      <LoginCard />
      <Link href="/register" className="text-center">
        新規登録
      </Link>
    </>
  );
}
