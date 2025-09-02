import { Prisma, prisma } from "@workspace/database-customer-karte";
import { NotesSearchCondition } from "../note-search-condition";

export async function getNotes({
  customerId,
  page,
  keyword,
}: NotesSearchCondition): Promise<{
  notes: Prisma.NoteGetPayload<{
    include: {
      staff: true;
    };
  }>[];
  totalPage: number;
}> {
  const perPage = 20;
  const skip = ((page || 1) - 1) * perPage;

  const where: Prisma.NoteWhereInput = { customerId };

  if (keyword) {
    where.text = { contains: keyword };
  }

  const [notes, totalCount] = await Promise.all([
    prisma.note.findMany({
      include: {
        staff: true,
      },
      where,
      skip,
      take: perPage,
    }),
    prisma.note.count({
      where,
    }),
  ]);

  return {
    notes,
    totalPage: Math.ceil(totalCount / perPage),
  };
}
