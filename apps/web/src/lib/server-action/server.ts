import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as v from "valibot";

import { fail, type Failure, type Result } from "../result";

type ValibotSchema =
  | v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>
  | v.BaseSchemaAsync<unknown, unknown, v.BaseIssue<unknown>>;

// inputSchemaが提供された場合の型定義
export function createServerAction<
  InputSchema extends ValibotSchema,
  Handler extends (
    inputs: v.InferInput<InputSchema>,
  ) => Promise<Result<unknown>>,
>(
  handler: Handler,
  options: {
    inputSchema: InputSchema;
    revalidatePaths?: string[];
    redirectTo?: string;
  },
): (
  input: v.InferOutput<InputSchema>,
) => Promise<Awaited<ReturnType<Handler>> | Failure>;

// inputSchemaが提供されない場合の型定義
export function createServerAction<
  Handler extends () => Promise<Result<unknown>>,
>(
  handler: Handler,
  options?: {
    inputSchema?: undefined;
    revalidatePaths?: string[];
    redirectTo?: string;
  },
): () => Promise<Awaited<ReturnType<Handler>> | Failure>;

// 実装
export function createServerAction<
  InputSchema extends ValibotSchema | undefined,
  Handler extends InputSchema extends ValibotSchema
    ? (inputs: v.InferInput<InputSchema>) => Promise<Result<unknown>>
    : () => Promise<Result<unknown>>,
>(
  handler: Handler,
  options?: {
    inputSchema?: InputSchema;
    revalidatePaths?: string[];
    redirectTo?: string;
  },
) {
  return async function action(
    ...args: InputSchema extends ValibotSchema
      ? [input: v.InferOutput<InputSchema>]
      : []
  ): Promise<ReturnType<Handler> | Failure> {
    // inputSchemaが提供されている場合のみバリデーションを実行
    if (options?.inputSchema) {
      const input = args[0];
      const parsedParams = await v.safeParseAsync(options.inputSchema, input);
      if (!parsedParams.success) {
        const errors =
          v.flatten<ValibotSchema>(parsedParams.issues).nested || {};

        return fail(Object.values<string>(errors)[0]);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (handler as any)(parsedParams.output);

      if (result.success && options.revalidatePaths?.length) {
        options.revalidatePaths.forEach((path) => {
          revalidatePath(path);
        });
      }

      if (result.success && options.redirectTo) {
        redirect(options.redirectTo);
      }

      return result;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (handler as any)();

      if (result.success && options?.revalidatePaths?.length) {
        options.revalidatePaths.forEach((path) => {
          revalidatePath(path);
        });
      }

      if (result.success && options?.redirectTo) {
        redirect(options.redirectTo);
      }

      return result;
    }
  };
}
