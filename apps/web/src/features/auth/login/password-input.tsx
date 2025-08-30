"use client";

import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

type PasswordInputProps = React.ComponentProps<"input"> & {
  showPassword: boolean;
  onTogglePassword: () => void;
};

export function PasswordInput({
  showPassword,
  onTogglePassword,
  className,
  ...props
}: PasswordInputProps) {
  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-0 top-0 h-full px-3 py-2 hover:opacity-70"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}
