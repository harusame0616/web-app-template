import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PasswordRegistrationForm } from "./password-registration-form";

export function PasswordRegistrationCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex justify-center">パスワード登録</CardTitle>
      </CardHeader>
      <CardContent>
        <PasswordRegistrationForm />
      </CardContent>
    </Card>
  );
}
