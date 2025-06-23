import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "../src/generated/prisma";
import { testUsers } from "./fixtures/users";

const prisma = new PrismaClient();

async function main() {
  try {
    // Supabase Authクライアントを作成
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
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
        user.id,
      );
      if (deleteError) {
        console.error(`Failed to delete user ${user.email}:`, deleteError);
        throw deleteError;
      }
    }

    // トランザクションで既存データをクリア
    await prisma.$transaction([prisma.user.deleteMany()]);

    const users = [];
    for (const userData of testUsers) {
      // DBにユーザーを作成（userIdを指定）
      const dbUser = await prisma.user.create({
        data: {
          userId: userData.userId,
          name: userData.name,
        },
      });

      await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: {
          name: userData.name,
          userId: userData.userId,
          role: "admin",
        },
      });

      users.push(dbUser);
    }
  } catch (error) {
    console.error("シードデータの作成中にエラーが発生しました:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
