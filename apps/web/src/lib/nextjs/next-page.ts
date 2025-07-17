type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export type NextPageProps = {
  params: Promise<Record<string, string | undefined>>;
  searchParams: Promise<SearchParams>;
};
