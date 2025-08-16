import { PrismaClient } from "@harusame.dev/database";

const prisma = new PrismaClient();

export async function getThreadDetail(threadId: string) {
  const thread = await prisma.thread.findUnique({
    where: {
      threadId,
    },
    include: {
      comments: {
        where: {
          deletedAt: null,
        },
        orderBy: {
          commentNumber: "asc",
        },
      },
    },
  });

  return thread;
}
