import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordRegistrationForm } from "./password-registration-form";

export function PasswordRegistrationCard() {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="flex justify-center">パスワード登録</CardTitle>
      </CardHeader>
      <CardContent>
        <PasswordRegistrationForm />
      </CardContent>
    </Card>
  );
}
