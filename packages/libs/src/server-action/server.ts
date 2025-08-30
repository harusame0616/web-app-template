import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as v from "valibot";

import { fail, Failure, Result } from "../result";

export function createServerAction<
  ParamsSchema extends  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | v.BaseSchema<any, any, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | v.BaseSchemaAsync<any, any, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Handler extends (inputs: v.InferInput<ParamsSchema>) => Promise<Result<any>>
>(
  handler: Handler,
  {
    inputSchema,
    revalidatePaths,
    redirectTo,
    revalidatePath: generateRevalidatePath,
  }: {
    inputSchema: ParamsSchema;
    revalidatePaths?: string[];
    redirectTo?: string;
    revalidatePath?:
      | ((params: v.InferOutput<ParamsSchema>) => string | string[] | undefined)
      | string
      | string[];
  }
) {
  return async function action(
    input: v.InferOutput<ParamsSchema>
  ): Promise<Awaited<ReturnType<Handler>> | Failure> {
    const parsedParams = await v.safeParseAsync(inputSchema, input);
    if (!parsedParams.success) {
      const errors = v.flatten<ParamsSchema>(parsedParams.issues).nested || {};

      return fail(Object.values<string>(errors)[0]);
    }

    let result: Awaited<ReturnType<Handler>>;
    try {
      result = (await handler(parsedParams.output)) as Awaited<
        ReturnType<Handler>
      >;
    } catch (error) {
      return fail("処理中にエラーが発生しました");
    }

    if (result.success && revalidatePaths?.length) {
      revalidatePaths.forEach((path) => {
        revalidatePath(path);
      });
    }

    if (result.success && generateRevalidatePath) {
      if (typeof generateRevalidatePath === "string") {
        revalidatePath(generateRevalidatePath);
      } else if (typeof generateRevalidatePath === "object") {
        generateRevalidatePath.forEach((path) => {
          revalidatePath(path);
        });
      } else {
        const result = generateRevalidatePath(parsedParams.output);

        if (result) {
          for (const path of typeof result === "string" ? [result] : []) {
            revalidatePath(path);
          }
        }
      }
    }

    if (result.success && redirectTo) {
      redirect(redirectTo);
    }

    return result;
  };
}
