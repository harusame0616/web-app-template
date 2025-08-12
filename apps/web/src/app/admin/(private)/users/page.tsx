import { Metadata } from "next";
import * as v from "valibot";

import { NextPageProps } from "@/lib/nextjs/next-page";

import { UsersPage } from "./user-page";

export const metadata: Metadata = {
  title: "ユーザー一覧",
};

const searchParamsSchema = v.object({
  page: v.optional(v.pipe(v.string(), v.transform(Number)), () => "1"),
});

export default async function NextPage({ searchParams }: NextPageProps) {
  const searchParamsAwaited = await searchParams;
  const searchParamsResult = v.safeParse(
    searchParamsSchema,
    searchParamsAwaited,
  );
  const { page } = searchParamsResult.success
    ? searchParamsResult.output
    : { page: 1 };

  return <UsersPage page={page} searchParams={searchParamsAwaited} />;
}
