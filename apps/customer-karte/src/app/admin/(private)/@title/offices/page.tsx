import { OfficeAddDialog } from "../../offices/add-office-dialog";

export default function OfficesTitlePage() {
  return (
    <div className="flex items-center justify-between">
      <h1>事業所一覧</h1>
      <OfficeAddDialog />
    </div>
  );
}
