import { fail, succeed } from "@/lib/result";
import { createClient } from "@/lib/supabase/server";

export async function invite({ email }: { email: string }) {
  const client = await createClient();

  const result = await client.auth.admin.inviteUserByEmail(email, {
    redirectTo: new URL("/password", process.env.SERVICE_URL!).href,
  });

  if (result.error) {
    return fail("招待メールの送信に失敗しました");
  }
  return succeed();
}
