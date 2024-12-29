import { Metadata } from "next";

import { PasswordRegistrationCard } from "./password-registration-card";

export const metadata: Metadata = {
  title: "パスワード登録",
};

export default function Page() {
  return (
    <>
      <PasswordRegistrationCard />
    </>
  );
}
