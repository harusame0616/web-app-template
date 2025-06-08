import NextLink from "next/link";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Link(props: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      {...props}
      className={cn("underline underline-offset-2", props.className)}
    />
  );
}
