import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { LoginFormContainer } from "./login-form-container";

export function AdminLoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Admin</CardTitle>
        <CardDescription>管理画面にログイン</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginFormContainer />
      </CardContent>
    </Card>
  );
}
