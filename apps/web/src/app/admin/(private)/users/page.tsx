import { Metadata } from "next";
import * as v from "valibot";

import { UsersPage } from "@/features/user/list/users-page";
import { NextPageProps, SearchParams } from "@/lib/nextjs/next-page";

export const metadata: Metadata = {
  title: "ユーザー一覧",
};

export default async function NextPage({ searchParams }: NextPageProps) {
  const { page } = await parseSearchParams(searchParams);

  return <UsersPage page={page} />;
}

async function parseSearchParams(searchParams: SearchParams) {
  return v.parse(
    v.object({
      page: v.optional(v.pipe(v.string(), v.transform(Number)), () => "1"),
    }),
    await searchParams,
  );
}
