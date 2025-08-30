import * as v from "valibot";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

export const notesSearchConditionSchema = v.object({
  year: v.optional(v.number(), currentYear),
  month: v.optional(
    v.pipe(v.number(), v.minValue(1), v.maxValue(12)),
    currentMonth,
  ),
});

export type NotesSearchCondition = v.InferOutput<
  typeof notesSearchConditionSchema
>;
