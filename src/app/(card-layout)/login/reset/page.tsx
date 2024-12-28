import Link from "next/link";
import { ResetCard } from "./reset-card";

export const maxDuration = 60;

export default function Page() {
  return (
    <>
      <ResetCard />
      <div className="mt-4 flex justify-center">
        <Link href="/signin" className="underline">
          ログイン
        </Link>
      </div>
    </>
  );
}
