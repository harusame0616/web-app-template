import * as v from "valibot";
import { fail, Failure, Result } from "./result";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export function createAction<
  InputSchema extends v.BaseSchema<any, any, any>,
  Handler extends (inputs: v.InferInput<InputSchema>) => Promise<Result<any>>
>(
  handler: Handler,
  {
    inputSchema,
    revalidatePaths,
    redirectTo,
  }: {
    inputSchema: InputSchema;
    revalidatePaths?: string[];
    redirectTo?: string;
  }
) {
  return async function action(
    input: v.InferOutput<InputSchema>
  ): Promise<Awaited<ReturnType<Handler>> | Failure> {
    const parsedParams = v.safeParse(inputSchema, input);
    if (!parsedParams.success) {
      const errors = v.flatten<InputSchema>(parsedParams.issues).nested || {};

      return fail(Object.values<string>(errors)[0]);
    }

    const result = (await handler(parsedParams.output)) as Awaited<
      ReturnType<Handler>
    >;

    if (result.success && revalidatePaths?.length) {
      revalidatePaths.forEach((path) => {
        revalidatePath(path);
      });
    }

    if (result.success && redirectTo) {
      redirect(redirectTo);
    }

    return result;
  };
}
