"use server";

import { redirect } from "next/navigation";
import * as v from "valibot";

import { createServerAction } from "@workspace/libs/server-action/server";
import { createClient } from "@/lib/supabase/server";
export const logoutAction = createServerAction(
  async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin/logout");
  },
  {
    inputSchema: v.object({}),
  },
);
