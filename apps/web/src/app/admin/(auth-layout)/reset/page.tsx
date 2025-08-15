import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublicAuthConfig } from "@/features/auth/common/auth-config";

import { AdminResetPage } from "../../../../features/auth/reset/admin-reset-page";

export const metadata: Metadata = {
  title: "パスワードリセット",
};

export default function NextPage() {
  const { isForgetPasswordEnabled: isForgetEmailEnabled } =
    getPublicAuthConfig();

  if (!isForgetEmailEnabled) {
    notFound();
  }

  return <AdminResetPage />;
}
