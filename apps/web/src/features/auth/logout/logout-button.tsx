"use client";

import { Button } from "@workspace/ui/components/button";
import { LoaderIcon, LogOutIcon } from "lucide-react";

import { useLogout } from "./use-logout";

export function LogoutButton() {
  const { logout, isPending } = useLogout();

  function handleLogout() {
    logout("/admin/login");
  }

  return (
    <Button
      variant="ghost"
      type="button"
      className="w-full justify-start"
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? <LoaderIcon className="animate-spin" /> : <LogOutIcon />}{" "}
      ログアウト
    </Button>
  );
}
