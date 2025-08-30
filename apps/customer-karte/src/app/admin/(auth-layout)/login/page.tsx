import { Metadata } from "next";

import { AdminLoginPage } from "./admin-login-page";

export const metadata: Metadata = {
  title: "管画面ログイン",
};

export default function NextPage() {
  return <AdminLoginPage />;
}
