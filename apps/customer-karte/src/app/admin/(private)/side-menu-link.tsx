"use client";

import Link from "next/link";
import { ComponentProps } from "react";

import { useSidebar } from "@workspace/ui/components/sidebar";

export function SideMenuLink(props: ComponentProps<typeof Link>) {
  const { setOpenMobile } = useSidebar();

  return <Link onNavigate={() => setOpenMobile(false)} {...props} />;
}
