import { Metadata } from "next";

import { AdminLoginPage } from "./admin-login-page";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function NextPage() {
  return <AdminLoginPage />;
}
