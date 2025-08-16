"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { ArrowLeft, Clock, Edit, MessageCircle, Send, Trash2, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination } from "@/lib/pagination";
import { VideoPlayer } from "./components/video-player";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import type { SignedVideoData } from "./data/get-signed-video-urls";

type Thread = {
  threadId: string;
  title: string;
  authorName: string;
  content: string;
  imageUrls: string[];
  videoIds: string[];
  signedVideos?: SignedVideoData[];
  lastPostedAt: Date;
  createdAt: Date;
  isDeleted?: boolean;
};

type Comment = {
  commentId: string;
  threadId: string;
  authorName: string;
  content: string;
  imageUrls?: string[];
  videoIds?: string[];
  signedVideos?: SignedVideoData[];
  createdAt: Date;
  isDeleted?: boolean;
};

type ThreadDetailPresenterProps = {
  thread: Thread;
  comments: Comment[];
  totalCommentPage: number;
  commentPage: number;
};

export function ThreadDetailPresenter({
  thread,
  comments,
  totalCommentPage,
  commentPage,
}: ThreadDetailPresenterProps) {
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(
    null,
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string>("");

  // 全画像を1つの配列にまとめる
  const allImages: { url: string; source: string }[] = [
    ...thread.imageUrls.map((url) => ({ url, source: "thread" })),
    ...comments.flatMap((comment) =>
      (comment.imageUrls || []).map((url) => ({
        url,
        source: `comment-${comment.commentId}`,
      })),
    ),
  ];

  const handleImageClick = (imageUrl: string) => {
    const index = allImages.findIndex((img) => img.url === imageUrl);
    if (index !== -1) {
      setExpandedImageIndex(index);
      setCurrent(index);
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (api && expandedImageIndex !== null) {
      api.scrollTo(expandedImageIndex);
    }
  }, [api, expandedImageIndex]);

  const handleCommentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setImagePreview(previews.slice(0, 4));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCommentVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* ヘッダー部分 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">スレッド詳細</h1>
          <Link
            href="/member/threads"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>一覧に戻る</span>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          スレッドの詳細と返信を表示しています。
        </p>
      </div>

      {/* スレッド本文 */}
      <div className="bg-card border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">{thread.title}</h2>
          {!thread.isDeleted && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="h-8 px-2"
                title="編集"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="h-8 px-2"
                title="削除"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{thread.authorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {format(new Date(thread.createdAt), "yyyy/MM/dd HH:mm", {
                locale: ja,
              })}
            </span>
          </div>
        </div>

        <div className="text-sm whitespace-pre-wrap">
          {thread.isDeleted ? (
            <span className="text-muted-foreground italic">
              このスレッドは削除されました
            </span>
          ) : (
            thread.content
          )}
        </div>

        {/* 動画表示 */}
        {!thread.isDeleted && thread.signedVideos && thread.signedVideos.length > 0 && (
          <div className="mt-4 space-y-3">
            {thread.signedVideos.map((video, index) => (
              <VideoPlayer
                key={index}
                videoId={video.videoId}
                iframeUrl={video.iframeUrl}
              />
            ))}
          </div>
        )}

        {/* 画像サムネイル表示 */}
        {!thread.isDeleted && thread.imageUrls.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {thread.imageUrls.map((url, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(url)}
                className="relative group cursor-pointer block h-24 w-24 overflow-hidden rounded-md border bg-muted"
              >
                <Image
                  src={url}
                  alt={`添付画像${index + 1}`}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity"
                  sizes="96px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* コメント一覧 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="h-5 w-5" />
          <h2 className="font-semibold">コメント ({comments.length}件)</h2>
        </div>

        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            まだコメントはありません
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.commentId}
                className="bg-card border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {comment.authorName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(
                          new Date(comment.createdAt),
                          "yyyy/MM/dd HH:mm",
                          {
                            locale: ja,
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  {!comment.isDeleted && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="h-7 px-2"
                        title="編集"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="h-7 px-2"
                        title="削除"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {comment.isDeleted ? (
                    <span className="text-muted-foreground italic">
                      このコメントは削除されました
                    </span>
                  ) : (
                    comment.content
                  )}
                </p>

                {/* コメントの動画表示 */}
                {!comment.isDeleted && comment.signedVideos && comment.signedVideos.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {comment.signedVideos.map((video, index) => (
                      <VideoPlayer
                        key={index}
                        videoId={video.videoId}
                        iframeUrl={video.iframeUrl}
                      />
                    ))}
                  </div>
                )}

                {/* コメントの画像サムネイル表示 */}
                {!comment.isDeleted && comment.imageUrls && comment.imageUrls.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {comment.imageUrls.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageClick(url)}
                        className="relative group cursor-pointer block h-20 w-20 overflow-hidden rounded-md border bg-muted"
                      >
                        <Image
                          src={url}
                          alt={`コメント画像${index + 1}`}
                          fill
                          className="object-cover hover:opacity-90 transition-opacity"
                          sizes="80px"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* コメントのページネーション */}
      {totalCommentPage > 1 && (
        <div className="mt-6">
          <Pagination page={commentPage} totalPage={totalCommentPage} />
        </div>
      )}

      {/* コメント投稿フォーム */}
      <div className="mt-6 bg-card border rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          コメントを投稿
        </h3>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="comment-name">名前</Label>
            <Input
              id="comment-name"
              type="text"
              placeholder="投稿者名を入力"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment-content">コメント</Label>
            <Textarea
              id="comment-content"
              placeholder="コメントを入力してください"
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment-password">パスワード（任意）</Label>
            <Input
              id="comment-password"
              type="password"
              placeholder="編集・削除時に必要"
            />
            <p className="text-sm text-gray-600">
              ※ 編集・削除時に必要（任意）
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment-images">画像添付（最大4枚）</Label>
            <Input
              id="comment-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleCommentImageChange}
            />
            <p className="text-sm text-gray-600">
              ※ 最大4枚まで、1枚あたり10MB以下
            </p>
            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {imagePreview.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`プレビュー ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment-video">動画添付（最大1本）</Label>
            <Input
              id="comment-video"
              type="file"
              accept="video/*"
              onChange={handleCommentVideoChange}
            />
            <p className="text-sm text-gray-600">※ 最大1本まで、200MB以下</p>
            {videoPreview && (
              <video
                src={videoPreview}
                controls
                className="w-full max-h-80 rounded-lg border mt-4"
              />
            )}
          </div>

          <div className="space-y-2">
            <Button type="submit" disabled className="w-full">
              <Send className="h-4 w-4 mr-2" />
              コメントを投稿
            </Button>
            <p className="text-center text-sm text-red-600 font-semibold">
              ※ デモのため、実際にはコメントを投稿できません
            </p>
          </div>
        </form>
      </div>

      {/* 画像拡大モーダル */}
      {expandedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          {/* 閉じるボタン */}
          <button
            onClick={() => setExpandedImageIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {/* 画像カウンター */}
          <div className="absolute top-4 left-4 text-white text-sm z-10">
            {current + 1} / {allImages.length}
          </div>

          {/* Carousel */}
          <Carousel
            setApi={setApi}
            className="w-full max-w-[90vw]"
            opts={{
              startIndex: expandedImageIndex,
              loop: false,
            }}
          >
            <CarouselContent>
              {allImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center"
                >
                  <div className="relative w-full h-[90vh]">
                    <Image
                      src={image.url}
                      alt={`拡大画像 ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      priority={index === expandedImageIndex}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white" />
            <CarouselNext className="right-2 bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white" />
          </Carousel>

          {/* インジケーター */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === current ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
