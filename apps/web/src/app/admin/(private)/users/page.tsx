import { Metadata } from "next";
import * as v from "valibot";

import { UsersPage } from "./user-page";

export const metadata: Metadata = {
  title: "ユーザー一覧",
};

const searchParamsSchema = v.object({
  page: v.optional(v.pipe(v.string(), v.transform(Number)), () => "1"),
});

export default async function NextPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
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
