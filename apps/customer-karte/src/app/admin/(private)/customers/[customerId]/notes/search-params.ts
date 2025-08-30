import * as v from "valibot";

import {
  type NotesSearchCondition,
  notesSearchConditionSchema,
} from "./notes-search-condition";

type SearchParams = { [key: string]: string | string[] | undefined };

export function parseSearchParams(
  searchParams: SearchParams,
): NotesSearchCondition {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  return v.parse(notesSearchConditionSchema, {
    year: searchParams.year ? Number(searchParams.year) : currentYear,
    month: searchParams.month ? Number(searchParams.month) : currentMonth,
  });
}
