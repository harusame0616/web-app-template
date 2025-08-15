import { notFound } from "next/navigation";

import { getPublicAuthConfig } from "@/features/auth/common/auth-config";
import { UpdatePasswordPage } from "@/features/auth/reset/update-password-page";

export default function NextPage() {
  const { isForgetPasswordEnabled } = getPublicAuthConfig();

  if (!isForgetPasswordEnabled) {
    notFound();
  }

  return <UpdatePasswordPage />;
}
