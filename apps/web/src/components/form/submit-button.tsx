import { LoaderIcon } from "lucide-react";
import { ComponentProps, PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";

type Props = { loading?: boolean } & ComponentProps<typeof Button>;

export function SubmitButton({
  loading,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Button {...props} disabled={loading || props.disabled} type="submit">
      {loading ? (
        <LoaderIcon className="animate-spin" aria-label="処理中" />
      ) : (
        children
      )}
    </Button>
  );
}
