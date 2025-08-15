import { Metadata } from "next";

import { AdminLoginPage } from "@/features/auth/login/admin-login-page";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function NextPage() {
  return <AdminLoginPage />;
}
