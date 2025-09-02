import { prisma } from "@workspace/database-customer-karte";
import { uuidv7 as uuid } from "uuidv7";

import { fail, Result, succeed } from "@workspace/libs/result";
import { createClient } from "@/lib/supabase/server";

type AddNoteParams = {
  customerId: string;
  text: string;
};

export async function addNote(
  params: AddNoteParams,
): Promise<Result<{ noteId: string }>> {
  const client = await createClient();
  const getUserResponse = await client.auth.getUser();
  const staffId = getUserResponse.data.user?.user_metadata?.staffId as
    | string
    | undefined;

  if (!staffId) {
    throw Error("error");
  }

  try {
    const note = await prisma.note.create({
      data: {
        customer: {
          connect: {
            customerId: params.customerId,
          },
        },
        staff: {
          connect: {
            staffId,
          },
        },
        noteId: uuid(),
        text: params.text,
        notedAt: new Date(),
      },
    });

    return succeed({ noteId: note.noteId });
  } catch (error) {
    console.error("ノート作成エラー:", error);
    return fail("ノートの作成に失敗しました");
  }
}
