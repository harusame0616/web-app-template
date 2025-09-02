import { AddNoteDialog } from "./add-note-dialog";

type PageProps = {
  params: Promise<{ customerId: string }>;
};

export default async function Default({ params }: PageProps) {
  const { customerId } = await params;

  return (
    <div className="grid grid-cols-[1fr_auto]">
      <div>ノート一覧</div>
      <AddNoteDialog customerId={customerId} />
    </div>
  );
}
