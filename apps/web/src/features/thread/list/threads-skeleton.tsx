import { Plus } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export function ThreadsSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">スレッド一覧</h1>
          <div className="flex items-center gap-1 text-sm">
            <Plus className="h-4 w-4" />
            <span>新規作成</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          会員限定の掲示板です。質問や情報共有にご活用ください。
        </p>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-card border rounded-lg p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-3" />

            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
