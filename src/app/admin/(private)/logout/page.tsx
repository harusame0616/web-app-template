import { Metadata } from "next";

import { LogoutPage } from "./logout-page";

export const metadata: Metadata = {
  title: "ログアウト",
};

export default function NextPage() {
  return <LogoutPage />;
}
