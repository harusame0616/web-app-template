import { Link } from "@/components/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { ResetForm } from "./reset-form";

export function AdminResetPage() {
  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Admin</CardTitle>
          <CardDescription>パスワードリセット</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetForm />
        </CardContent>
      </Card>
      <div className="text-center">
        <Link href="/admin/login">ログインに戻る</Link>
      </div>
    </>
  );
}
