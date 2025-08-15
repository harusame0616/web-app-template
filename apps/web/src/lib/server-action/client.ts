import { fail, type Result } from "@/lib/result";

export async function handleServerAction<T>(
  serverActionResult: Promise<Result<T>>,
): Promise<Result<T>> {
  const result = await serverActionResult;

  // version skew で server action が呼び出せなかった場合
  if (!result) {
    return fail(
      "最新のバージョンがご利用いただけます。お手数ですが再読込して再度実行してください",
    );
  }

  return result;
}
