import type { Result } from "./result";

export async function handleServerAction<T>(
  serverActionResult: Promise<Result<T>>,
  {
    onSuccess,
    onFailure,
  }: {
    onSuccess?: (data: T) => void | Promise<void>;
    onFailure?: (message: string) => void | Promise<void>;
  },
): Promise<void> {
  const result = await serverActionResult;

  // version skew で server action が呼び出せなかった場合
  if (!result) {
    await onFailure?.(
      "最新のバージョンがご利用いただけます。お手数ですが再読込して再度実行してください",
    );
    return;
  }

  if (result.success) {
    await onSuccess?.(result.data);
  } else {
    await onFailure?.(result.message);
  }
}
