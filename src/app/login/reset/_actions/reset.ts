import { fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

export async function reset({ email }: { email: string }) {
  console.log("reset");
  const client = await createClient();

  const result = await client.auth.resetPasswordForEmail(email, {
    redirectTo: new URL(`/password`, process.env.SERVICE_URL!).href,
  });
  if (result.error) {
    return fail(
      "パスワードリセットメールの送信に失敗しました。時間をおいてお試しください"
    );
  }
  return succeed();
}
