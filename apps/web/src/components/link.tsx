import { cn } from "@workspace/ui/lib/utils";
import NextLink from "next/link";
import { ComponentProps } from "react";

export function Link(props: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      {...props}
      className={cn("underline underline-offset-2", props.className)}
    />
  );
}
