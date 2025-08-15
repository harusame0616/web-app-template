import { notFound } from "next/navigation";

import { getPublicAuthConfig } from "@/features/auth/common/auth-config";
import { ResetCompletePage } from "@/features/auth/reset/reset-complete-page";

export default function NextPage() {
  const { isForgetPasswordEnabled } = getPublicAuthConfig();

  if (!isForgetPasswordEnabled) {
    notFound();
  }

  return <ResetCompletePage />;
}
