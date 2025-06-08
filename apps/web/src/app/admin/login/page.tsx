import { Metadata } from "next";

import { LoginCard } from "./_components/login-card";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center p-4">
      <div className="max-h-[120px] grow" />
      <div className="w-full max-w-sm">
        <LoginCard />
      </div>
    </div>
  );
}
