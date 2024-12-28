import Link from "next/link";
import { LoginCard } from "./login-card";

export default function Page() {
  return (
    <>
      <LoginCard />
      <Link href="/register" className="underline text-center">
        新規登録
      </Link>
    </>
  );
}
