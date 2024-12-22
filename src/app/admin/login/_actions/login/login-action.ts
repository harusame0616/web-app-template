"use server";

import { createAction } from "@/lib/server-action";
import { redirect } from "next/navigation";
import * as v from "valibot";
import { login } from "./login";
import { Failure } from "@/lib/result";

export const loginAction = createAction(
  v.object({
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.minLength(6), v.maxLength(64)),
  }),
  async (loginParams): Promise<Failure | never> => {
    const result = await login(loginParams);

    if (!result.success) {
      return result;
    }

    redirect("/admin");
  }
);
