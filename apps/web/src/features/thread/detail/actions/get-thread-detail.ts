import { PrismaClient } from "@harusame.dev/database";

import { fail, succeed, type Result } from "@/lib/result";

const prisma = new PrismaClient();

type ThreadDetail = {
  threadId: string;
  title: string;
  authorName: string;
  content: string;
  imageUrls: string[];
  videoIds: string[];
  lastPostedAt: Date;
  createdAt: Date;
  isDeleted?: boolean;
  comments: Array<{
    commentId: string;
    commentNumber: number;
    authorName: string;
    content: string;
    imageUrls: string[];
    videoIds: string[];
    createdAt: Date;
    isDeleted?: boolean;
  }>;
};

type GetThreadDetailParams = {
  threadId: string;
  commentPage?: number;
};

export async function getThreadDetail(
  params: GetThreadDetailParams,
): Promise<Result<{ thread: ThreadDetail; totalCommentPage: number; commentPage: number }>> {
  try {
    const commentPage = params.commentPage || 1;
    const commentsPerPage = 20;
    const skip = (commentPage - 1) * commentsPerPage;

    const thread = await prisma.thread.findFirst({
      where: {
        threadId: params.threadId,
      },
    });

    if (!thread) {
      return fail("指定されたスレッドが見つかりません");
    }

    const [comments, totalCommentCount] = await Promise.all([
      prisma.comment.findMany({
        where: {
          threadId: params.threadId,
        },
        orderBy: {
          commentNumber: "asc",
        },
        skip,
        take: commentsPerPage,
      }),
      prisma.comment.count({
        where: {
          threadId: params.threadId,
        },
      }),
    ]);

    const threadDetail: ThreadDetail = {
      threadId: thread.threadId,
      title: thread.title,
      authorName: thread.deletedAt ? "削除済みユーザー" : thread.authorName,
      content: thread.deletedAt ? "このスレッドは削除されました" : thread.content,
      imageUrls: thread.deletedAt ? [] : thread.imageUrls,
      videoIds: thread.deletedAt ? [] : thread.videoIds,
      lastPostedAt: thread.lastPostedAt,
      createdAt: thread.createdAt,
      isDeleted: !!thread.deletedAt,
      comments: comments.map((comment) => ({
        commentId: comment.commentId,
        commentNumber: comment.commentNumber,
        authorName: comment.deletedAt ? "削除済みユーザー" : comment.authorName,
        content: comment.deletedAt ? "このコメントは削除されました" : comment.content,
        imageUrls: comment.deletedAt ? [] : comment.imageUrls,
        videoIds: comment.deletedAt ? [] : comment.videoIds,
        createdAt: comment.createdAt,
        isDeleted: !!comment.deletedAt,
      })),
    };

    const totalCommentPage = Math.ceil(totalCommentCount / commentsPerPage);

    return succeed({ thread: threadDetail, totalCommentPage, commentPage });
  } catch (error) {
    console.error("スレッド詳細取得エラー:", error);
    return fail("スレッド詳細の取得中にエラーが発生しました");
  }
}
