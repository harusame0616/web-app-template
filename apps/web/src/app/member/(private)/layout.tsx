import { Metadata } from "next";
import { PropsWithChildren } from "react";

import { AppName } from "@/app-info";

export const metadata: Metadata = {
  title: {
    template: `%s | ${AppName}`,
    default: `${AppName}`,
  },
};

export default async function Layout({ children }: PropsWithChildren) {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser();

  // if (error || !user) {
  //   redirect("/login");
  // }

  return children;
}
