import { Metadata } from "next";
import * as v from "valibot";

import { NextPageProps, SearchParams } from "@/lib/nextjs/next-page";

import { CustomersPage } from "./customers-page";
import { CustomersSearchCondition } from "./customers-search-condition";

export const metadata: Metadata = {
  title: "顧客一覧",
};

export default async function NextPage({ searchParams }: NextPageProps) {
  const parsedSearchParams = await parseSearchParams(searchParams);

  return <CustomersPage condition={parsedSearchParams} />;
}

async function parseSearchParams(
  searchParams: SearchParams,
): Promise<CustomersSearchCondition> {
  return v.parse(
    v.object({
      page: v.optional(v.pipe(v.string(), v.transform(Number)), () => "1"),
      keyword: v.optional(v.string()),
      officeIds: v.optional(
        v.union([
          v.pipe(
            v.string(),
            v.transform((val) => [val]),
          ),
          v.pipe(v.array(v.string())),
        ]),
      ),
    }),
    await searchParams,
  );
}
