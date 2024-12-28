"use client";

import { createClient } from "@/lib/supabase/browser";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const client = createClient();
    client.auth.signOut().then(() => {
      router.refresh();
    });
  });

  return (
    <div className="max-h-32 flex flex-col items-center h-full justify-end">
      <div>ログアウト中です</div>
      <RefreshCw className="animate-spin mt-8" />
    </div>
  );
}