import { ThreadsPage } from "@/features/thread/list/threads-page";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;

  return <ThreadsPage page={page} />;
}
