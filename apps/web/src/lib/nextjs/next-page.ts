type NextPagePropsParam = {
  [key: string]: string | string[] | undefined;
};

export type NextPageProps = {
  params: Promise<NextPagePropsParam>;
  searchParams: Promise<NextPagePropsParam>;
};
