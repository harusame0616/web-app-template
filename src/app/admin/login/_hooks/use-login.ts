import { useTransition } from "react";
import { loginAction } from "../_actions/login/login-action";

export function useLogin() {
  const [isPending, startTransition] = useTransition();

  function login(params: { email: string; password: string }) {
    startTransition(async () => {
      const result = await loginAction(params);
    });
  }

  return {
    login,
    isPending,
  };
}
