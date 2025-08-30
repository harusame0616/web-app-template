import { Badge } from "../../../../packages/ui/src/components/badge";

export function RequiredBadge() {
  return (
    <Badge variant="outline" className="border-destructive text-destructive">
      必須
    </Badge>
  );
}
