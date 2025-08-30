import { CheckCircle } from "lucide-react";
import Link from "next/link";

export function ResetCompletePage() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          <CheckCircle className="h-16 w-16 text-green-500" />

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">メール送信完了</h1>
            <p className="text-muted-foreground">
              パスワードリセットメールを送信しました
            </p>
          </div>

          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-md bg-muted p-4">
              <p className="font-medium mb-2">重要なお知らせ</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  メールアドレスが登録済みの場合のみ、リセットメールが送信されます
                </li>
                <li>
                  メールが届かない場合は、迷惑メールフォルダをご確認ください
                </li>
                <li>
                  しばらく経ってもメールが届かない場合は、登録済みのメールアドレスであることを確認の上、
                  再度パスワードリセットの操作をお試しください
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-center">
            <Link
              href="/admin/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              ログインへ戻る
            </Link>
            <Link
              href="/admin/reset"
              className="text-primary underline-offset-4 hover:underline"
            >
              再度リセットする
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
