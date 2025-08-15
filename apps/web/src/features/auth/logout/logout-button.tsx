"use client";

import { LoaderIcon, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

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
