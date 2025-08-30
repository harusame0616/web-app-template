import { fail, succeed } from "@workspace/libs/result";
import { createClient } from "@/lib/supabase/server";

export async function updatePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) {
  const supabase = await createClient();

  // 現在のユーザーを取得
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError || !user) {
    return fail("ユーザー情報の取得に失敗しました");
  }

  // 現在のパスワードで再認証を試みる
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  });

  if (signInError) {
    return fail("現在のパスワードが正しくありません");
  }

  // パスワードを更新
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    if (updateError.code === "same_password") {
      return succeed();
    }
    console.error("パスワード更新エラー:", updateError);
    return fail("パスワードの更新に失敗しました");
  }

  return succeed();
}
