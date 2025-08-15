import { fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

export async function reset({ email }: { email: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/admin/reset/update-password`,
  });

  if (error) {
    return fail("パスワードリセットメールの送信に失敗しました");
  }

  return succeed();
}
