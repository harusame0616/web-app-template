import { PasswordRegistrationCard } from "./password-registration-card";
import { Metadata } from "next";

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
