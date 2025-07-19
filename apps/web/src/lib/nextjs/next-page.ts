export type Params = Promise<{
  [key: string]: string | undefined;
}>;
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type NextPageProps = {
  params: Params;
  searchParams: SearchParams;
};
