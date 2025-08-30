import { Metadata } from "next";
import * as v from "valibot";

import { SearchParams } from "@/lib/nextjs/next-page";

import { UsersPage } from "./user-page";

export const metadata: Metadata = {
  title: "ユーザー一覧",
};

export default async function NextPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { page } = await parseSearchParams(searchParams);

  return <UsersPage page={page} />;
}

async function parseSearchParams(searchParams: SearchParams) {
  return v.parse(
    v.object({
      page: v.optional(v.pipe(v.string(), v.transform(Number))),
    }),
    await searchParams,
  );
}
