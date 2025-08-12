import { createClient } from "@supabase/supabase-js";
import { testUsers } from "./fixtures/users";

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
  } catch (error) {
    console.error("シードデータの作成中にエラーが発生しました:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
