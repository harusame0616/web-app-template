"use client";
import { useRouter } from "next/navigation";

import { Link } from "@/components/link";
import { Button } from "@workspace/ui/components/button";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push("/admin/login")}>xx</Button>

      <Link href="/admin/login">ログイン</Link>
    </div>
  );
}
