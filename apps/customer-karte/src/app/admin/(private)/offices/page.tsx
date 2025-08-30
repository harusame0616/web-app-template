import { Metadata } from "next";
import * as v from "valibot";

import { NextPageProps, SearchParams } from "@/lib/nextjs/next-page";

import { OfficesPage } from "./office-page";

export const metadata: Metadata = {
  title: "事業所一覧",
};

export default async function NextPage({ searchParams }: NextPageProps) {
  const { page } = await parseSearchParams(searchParams);

  return <OfficesPage page={page} />;
}

async function parseSearchParams(searchParams: SearchParams) {
  return v.parse(
    v.object({
      page: v.optional(v.pipe(v.string(), v.transform(Number))),
    }),
    await searchParams,
  );
}
