import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="flex justify-center">ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
