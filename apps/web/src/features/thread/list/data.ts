import { PrismaClient } from "@harusame.dev/database";

const prisma = new PrismaClient();

export async function getThreads(page: number) {
  const perPage = 20;
  const skip = (page - 1) * perPage;

  const [threads, totalCount] = await Promise.all([
    prisma.thread.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        lastPostedAt: "desc",
      },
      skip,
      take: perPage,
      include: {
        _count: {
          select: {
            comments: {
              where: {
                deletedAt: null,
              },
            },
          },
        },
      },
    }),
    prisma.thread.count({
      where: {
        deletedAt: null,
      },
    }),
  ]);

  return {
    threads: threads.map((thread) => ({
      threadId: thread.threadId,
      title: thread.title,
      authorName: thread.authorName,
      content: thread.content,
      imageUrls: thread.imageUrls,
      commentCount: thread._count.comments,
      lastPostedAt: thread.lastPostedAt,
      createdAt: thread.createdAt,
    })),
    totalPage: Math.ceil(totalCount / perPage),
  };
}
