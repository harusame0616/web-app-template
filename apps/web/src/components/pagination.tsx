import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  totalPage: number;
  searchParams: Record<string, string | string[] | undefined>;
};

export function Pagination({ totalPage, page, searchParams }: Props) {
  const pageDisplayCount = 2;
  const beforePages = Array.from({ length: pageDisplayCount })
    .map((_, index) => page - (index + 1))
    .filter((page) => page > 1)
    .reverse();
  const afterPages = Array.from({ length: pageDisplayCount })
    .map((_, index) => page + (index + 1))
    .filter((page) => page < totalPage);
  const beforeFirstPage = beforePages.at(0);
  const afterLastPage = afterPages.at(-1);
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page") {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => urlSearchParams.append(key, v));
    } else if (value !== undefined) {
      urlSearchParams.set(key, value);
    } else {
      // do nothing
    }
  }
  function generatePageLink(page: number) {
    const linkSearchParams = new URLSearchParams(urlSearchParams);
    linkSearchParams.set("page", page.toString());
    return `?${linkSearchParams}`;
  }

  return (
    <ShadcnPagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href={generatePageLink(page - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={generatePageLink(1)}>1</PaginationLink>
            </PaginationItem>
          </>
        )}
        {/* 省略しているのが 2 だけの場合はそのまま 2 を表示する*/}
        {beforePages.length > 0 && beforePages.at(0) === 3 && (
          <PaginationItem>
            <PaginationLink href={generatePageLink(2)}>2</PaginationLink>
          </PaginationItem>
        )}
        {beforeFirstPage && beforeFirstPage >= 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {beforePages.map((beforePage) => (
          <PaginationItem key={beforePage}>
            <PaginationLink href={generatePageLink(beforePage)}>
              {beforePage}
            </PaginationLink>
          </PaginationItem>
        ))}
        {
          <PaginationItem>
            <PaginationLink href={generatePageLink(page)} isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
        }
        {afterPages.map((afterPage) => (
          <PaginationItem key={afterPage}>
            <PaginationLink href={generatePageLink(afterPage)}>
              {afterPage}
            </PaginationLink>
          </PaginationItem>
        ))}
        {!!afterLastPage && afterLastPage < totalPage - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* 省略しているのが pageCount -1 だけの場合はそのまま pageCount - 1を表示する*/}
        {afterPages.length > 0 && afterPages.at(-1) === totalPage - 2 && (
          <PaginationItem>
            <PaginationLink href={generatePageLink(totalPage - 1)}>
              {totalPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < totalPage && (
          <>
            <PaginationItem>
              <PaginationLink href={generatePageLink(totalPage)}>
                {totalPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={generatePageLink(page + 1)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </ShadcnPagination>
  );
}
