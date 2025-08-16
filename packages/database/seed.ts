import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "./src/generated/prisma";
import { testThreads, testThreadComments } from "./fixtures/threads";
import { testUsers } from "./fixtures/users";

const prisma = new PrismaClient();

async function main() {
  try {
    // Supabase Authクライアントを作成
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 既存の認証ユーザーを削除
    const {
      data: { users: existingUsers },
      error: listError,
    } = await supabase.auth.admin.listUsers();
    if (listError) {
      console.error("Failed to list existing users:", listError);
      throw listError;
    }

    for (const user of existingUsers || []) {
      const { error: deleteError } = await supabase.auth.admin.deleteUser(
        user.id
      );
      if (deleteError) {
        console.error(`Failed to delete user ${user.email}:`, deleteError);
        throw deleteError;
      }
    }

    // Supabase Authにユーザーを作成
    for (const userData of testUsers) {
      await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: {
          name: userData.name,
          role: "admin",
        },
      });
    }

    // 既存のスレッドデータを削除（コメントも自動的に削除される）
    await prisma.thread.deleteMany();

    // スレッドデータを作成
    for (const threadData of testThreads) {
      await prisma.thread.create({
        data: threadData,
      });
    }

    // コメントデータを作成
    let commentNumber = 1;
    for (const commentData of testThreadComments) {
      const thread = await prisma.thread.findUnique({
        where: { threadId: commentData.threadId },
        include: {
          _count: {
            select: {
              comments: {
                where: { deletedAt: null },
              },
            },
          },
        },
      });

      if (thread) {
        await prisma.comment.create({
          data: {
            commentId: commentData.commentId,
            threadId: commentData.threadId,
            authorName: commentData.authorName,
            content: commentData.content,
            imageUrls: commentData.imageUrls || [],
            videoIds: commentData.videoIds || [],
            commentNumber: thread._count.comments + 1,
            createdAt: commentData.createdAt,
          },
        });

        // スレッドの最終投稿日時を更新
        await prisma.thread.update({
          where: { threadId: commentData.threadId },
          data: {
            lastPostedAt: commentData.createdAt,
          },
        });
      }
    }

    console.log("スレッドとコメントのシードデータを作成しました");
  } catch (error) {
    console.error("シードデータの作成中にエラーが発生しました:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
