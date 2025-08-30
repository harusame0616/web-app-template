import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

import { Office } from "@workspace/database-customer-karte";
import { OfficeTableActions } from "./office-table-actions";

type OfficesPresenterProps = {
  offices: Office[];
  page: number;
  totalPage: number;
};

export function OfficesPresenter({
  offices,
  page,
  totalPage,
}: OfficesPresenterProps) {
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
          {offices.map(({ officeId, name }) => (
            <TableRow key={officeId}>
              <TableCell>{name}</TableCell>
              <TableCell>
                <OfficeTableActions office={{ name, officeId }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!offices.length && (
        <div className="mt-8 text-center text-xs text-muted-foreground">
          事業所が見つかりません
        </div>
      )}
      <div className="mt-4">
        <Pagination page={page} totalPage={totalPage} />
      </div>
    </div>
  );
}
