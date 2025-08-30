import { Link } from "@/components/link";

export default function Title() {
  return (
    <div>
      <div className="grid grid-cols-[1fr_auto]">
        <div>顧客一覧</div>
        <div>
          <Link href="/admin/customers/new">新規作成</Link>
        </div>
      </div>
    </div>
  );
}
