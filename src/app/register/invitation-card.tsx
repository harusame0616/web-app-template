import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvitationForm } from "./invitation-form";

export function InvitationCard() {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="flex justify-center">新規登録</CardTitle>
      </CardHeader>
      <CardContent>
        <InvitationForm />
      </CardContent>
    </Card>
  );
}
