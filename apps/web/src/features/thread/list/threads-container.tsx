import { getThreads } from "./data";
import { ThreadsPresenter } from "./threads-presenter";

type ThreadsContainerProps = {
  page: number;
};

export async function ThreadsContainer({ page }: ThreadsContainerProps) {
  const { totalPage, threads } = await getThreads(page);

  return (
    <ThreadsPresenter threads={threads} totalPage={totalPage} page={page} />
  );
}
