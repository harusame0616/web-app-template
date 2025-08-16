import { ThreadCreateForm } from "@/features/thread/create/thread-create-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ThreadNewPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* ヘッダー部分 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">新規スレッド作成</h1>
          <Link
            href="/member/threads"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>一覧に戻る</span>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          新しいスレッドを作成して、質問や情報を共有しましょう。
        </p>
      </div>

      {/* コンテンツ */}
      <ThreadCreateForm />
    </div>
  );
}
