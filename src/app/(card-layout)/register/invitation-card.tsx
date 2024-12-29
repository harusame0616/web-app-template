import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { InvitationForm } from "./invitation-form";

export function InvitationCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex justify-center">新規登録</CardTitle>
      </CardHeader>
      <CardContent>
        <InvitationForm />
      </CardContent>
    </Card>
  );
}
