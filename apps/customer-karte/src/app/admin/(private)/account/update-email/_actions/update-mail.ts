import { fail, succeed } from "@workspace/libs/result";
import { createClient } from "@/lib/supabase/server";

export async function updateMail(email: string) {
  const supabase = await createClient();

  // 現在のユーザーを取得
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();
  if (getUserError || !user) {
    return fail("ユーザー情報の取得に失敗しました");
  }

  // メールアドレスを更新（admin auth を使用）
  const { error: updateError } = await supabase.auth.admin.updateUserById(
    user.id,
    {
      email,
      email_confirm: true, // メールアドレスを確認済みとして設定
    },
  );

  if (updateError) {
    console.error("メールアドレス更新エラー:", updateError);
    return fail(
      "メールアドレスの更新に失敗しました。登録済みのメールアドレスでないか確認してください。",
    );
  }

  return succeed();
}
