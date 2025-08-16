import { Suspense } from "react";

import { AdminPageLayout } from "@/components/admin-page-layout";

import { ThreadsContainer } from "./threads-container";
import { ThreadsSkeleton } from "./threads-skeleton";

type ThreadsPageProps = {
  page: number;
};

export function ThreadsPage({ page }: ThreadsPageProps) {
  return (
    <Suspense fallback={<ThreadsSkeleton />}>
      <ThreadsContainer page={page} />
    </Suspense>
  );
}
