import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { handleServerAction } from "@/lib/server-action/client";

import { logoutAction } from "./actions";

export function useLogout() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  function logout(nextUrl: string) {
    setErrorMessage("");
    startTransition(async () => {
      const result = await handleServerAction(logoutAction());

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      router.replace(nextUrl);
    });
  }

  return {
    logout,
    isPending,
    errorMessage,
  };
}
