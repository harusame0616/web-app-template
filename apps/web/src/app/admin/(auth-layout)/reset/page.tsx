import { Metadata } from "next";

import { AdminResetPage } from "./_components/admin-reset-page";

export const metadata: Metadata = {
  title: "パスワードリセット",
};

export default function NextPage() {
  return <AdminResetPage />;
}
