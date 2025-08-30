import { Metadata } from "next";
import { Suspense } from "react";

import { NextPageProps, Params, SearchParams } from "@/lib/nextjs/next-page";

import * as v from "valibot";
import { NotesSearchCondition } from "./note-search-condition";
import { NotesContainer, NotesSkeleton } from "./notes";

export const metadata: Metadata = {
  title: "問診一覧",
};

export default async function Page({ params, searchParams }: NextPageProps) {
  const [parsedParams, parsedSearchParams] = await Promise.all([
    parseParams(params),
    parseSearchParams(searchParams),
  ]);

  return (
    <Suspense fallback={<NotesSkeleton />}>
      <NotesContainer condition={{ ...parsedParams, ...parsedSearchParams }} />
    </Suspense>
  );
}

async function parseSearchParams(
  searchParams: SearchParams,
): Promise<Omit<NotesSearchCondition, "customerId">> {
  return v.parse(
    v.object({
      page: v.optional(v.pipe(v.string(), v.transform(Number)), () => "1"),
      keyword: v.optional(v.string()),
    }),
    await searchParams,
  );
}

async function parseParams(
  params: Params,
): Promise<Pick<NotesSearchCondition, "customerId">> {
  return v.parse(
    v.object({
      customerId: v.string(),
    }),
    await params,
  );
}
