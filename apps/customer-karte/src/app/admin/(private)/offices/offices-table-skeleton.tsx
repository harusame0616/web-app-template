import { Pagination } from "@/components/pagination";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

type OfficesTableSkeletonProps = {
  page: number;
};

export function OfficesSkeleton({ page }: OfficesTableSkeletonProps) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>事業所名</TableHead>
            <TableHead className="w-14">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="py-4">
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell className="py-3">
                <Skeleton className="size-6" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Pagination page={page} totalPage={1} />
      </div>
    </div>
  );
}
