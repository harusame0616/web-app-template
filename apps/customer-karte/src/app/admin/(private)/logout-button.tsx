"use client";

import { LoaderIcon, LogOutIcon } from "lucide-react";
import { useTransition } from "react";

import { handleServerAction } from "@workspace/libs/server-action/client";

import { logoutAction } from "./logout-action";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();
  async function handleLogout() {
    console.log("handlelogout");
    startTransition(async () => {
      await handleServerAction(logoutAction({}), {});
      console.log("handle");
    });
  }

  return (
    <button type="button" onClick={handleLogout} className="w-full">
      {pending ? (
        <LoaderIcon />
      ) : (
        <div className="flex gap-2 items-center">
          <LogOutIcon className="size-4" />
          ログアウト
        </div>
      )}
    </button>
  );
}
