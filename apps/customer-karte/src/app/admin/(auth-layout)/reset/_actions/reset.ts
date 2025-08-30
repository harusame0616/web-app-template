import { fail, succeed } from "@workspace/libs/result";
import { createClient } from "@/lib/supabase/server";

export async function reset({ email }: { email: string }) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/admin/reset/update-password`,
    });

    if (error) {
      return fail("パスワードリセットメールの送信に失敗しました");
    }

    return succeed("パスワードリセットメールを送信しました");
  } catch (error) {
    console.error("Password reset error:", error);
    return fail("予期せぬエラーが発生しました");
  }
}
