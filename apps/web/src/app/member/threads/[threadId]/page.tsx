import { ThreadDetailPage } from "@/features/thread/detail/thread-detail-page";

type PageProps = {
  params: Promise<{ threadId: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { threadId } = await params;
  const { page } = await searchParams;
  const commentPage = page ? parseInt(page, 10) : 1;
  
  return <ThreadDetailPage threadId={threadId} commentPage={commentPage} />;
}
