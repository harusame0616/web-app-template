"use server";

import { prisma } from "@workspace/database-customer-karte";
import { revalidatePath } from "next/cache";
import * as v from "valibot";

import { createClient } from "@/lib/supabase/server";

const deleteInterviewInputSchema = v.object({
  noteId: v.string(),
  customerId: v.string(),
});

export async function deleteInterviewAction(
  input: v.InferInput<typeof deleteInterviewInputSchema>,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "認証されていません" };
  }

  const { noteId, customerId } = v.parse(deleteInterviewInputSchema, input);

  try {
    // インタビューを削除
    await prisma.prismaNote.delete({
      where: {
        noteId,
      },
    });

    revalidatePath(`/admin/customers/${customerId}/notes`);
    return { success: true };
  } catch (error) {
    console.error("インタビュー削除エラー:", error);
    return { success: false, error: "削除に失敗しました" };
  }
}
