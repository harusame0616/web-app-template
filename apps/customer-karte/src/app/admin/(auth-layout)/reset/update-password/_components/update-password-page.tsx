import { UpdatePasswordForm } from "./update-password-form";

export function UpdatePasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border bg-card p-8 shadow-lg">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">パスワードの再設定</h1>
            <p className="text-muted-foreground">
              新しいパスワードを入力してください
            </p>
          </div>

          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
