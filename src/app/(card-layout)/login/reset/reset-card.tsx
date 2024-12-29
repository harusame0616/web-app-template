import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ResetForm } from "./reset-form";

export function ResetCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex justify-center">
          パスワードリセット
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResetForm />
      </CardContent>
    </Card>
  );
}
