import { notFound } from "next/navigation";
import { getThreadDetailAction } from "./actions/get-thread-detail-action";
import { getSignedVideoUrls } from "./data/get-signed-video-urls";
import { ThreadDetailPresenter } from "./thread-detail-presenter";

type ThreadDetailPageProps = {
  threadId: string;
  commentPage?: number;
};

export async function ThreadDetailPage({ threadId, commentPage = 1 }: ThreadDetailPageProps) {
  const result = await getThreadDetailAction({ threadId, commentPage });
  
  if (!result.success) {
    notFound();
  }

  const { thread, totalCommentPage } = result.data;
  
  // スレッドの動画URLを署名付きに変換
  const threadVideos = thread.videoIds
    ? await getSignedVideoUrls(thread.videoIds)
    : [];

  // コメントの動画URLを署名付きに変換
  const commentsWithSignedVideos = await Promise.all(
    thread.comments.map(async (comment) => {
      const signedVideos = comment.videoIds
        ? await getSignedVideoUrls(comment.videoIds)
        : undefined;

      return {
        ...comment,
        threadId: thread.threadId,
        signedVideos,
      };
    }),
  );

  return (
    <ThreadDetailPresenter
      thread={{
        ...thread,
        signedVideos: threadVideos,
      }}
      comments={commentsWithSignedVideos}
      totalCommentPage={totalCommentPage}
      commentPage={commentPage}
    />
  );
}
