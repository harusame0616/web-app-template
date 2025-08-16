"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Clock, ImageIcon, MessageCircle, Plus, User } from "lucide-react";

import { Pagination } from "@/lib/pagination";
import Link from "next/link";

type Thread = {
  threadId: string;
  title: string;
  authorName: string;
  content: string;
  imageUrls: string[];
  commentCount: number;
  lastPostedAt: Date;
  createdAt: Date;
};

type ThreadsPresenterProps = {
  threads: Thread[];
  totalPage: number;
  page: number;
};

export function ThreadsPresenter({
  threads,
  totalPage,
  page,
}: ThreadsPresenterProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">スレッド一覧</h1>
          <Link
            href="/member/threads/new"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Plus className="h-4 w-4" />
            <span>新規作成</span>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          会員限定の掲示板です。質問や情報共有にご活用ください。
        </p>
      </div>

      <div className="space-y-3">
        {threads.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            スレッドがありません
          </div>
        ) : (
          threads.map((thread) => (
            <Link
              key={thread.threadId}
              href={`/member/threads/${thread.threadId}`}
              className="block"
            >
              <div className="bg-card border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                <h2 className="font-semibold text-base mb-2 line-clamp-2">
                  {thread.title}
                </h2>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {thread.content}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{thread.authorName}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{thread.commentCount}件</span>
                  </div>

                  {thread.imageUrls.length > 0 && (
                    <div className="flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      <span>{thread.imageUrls.length}枚</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {format(new Date(thread.lastPostedAt), "MM/dd HH:mm", {
                        locale: ja,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {totalPage > 1 && (
        <div className="mt-6">
          <Pagination page={page} totalPage={totalPage} />
        </div>
      )}
    </div>
  );
}
