import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { handleServerAction } from "@/lib/server-action/client";

import { loginAction } from "./actions";

export function useLogin() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  function login(email: string, password: string, nextUrl: string) {
    setErrorMessage("");

    startTransition(async () => {
      const result = await handleServerAction(loginAction({ email, password }));

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      router.replace(nextUrl);
    });
  }

  return {
    login,
    isPending,
    errorMessage,
  };
}
