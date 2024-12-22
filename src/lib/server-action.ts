import * as v from "valibot";
import { fail, Result } from "./result";

export function createAction<
  InputSchema extends v.BaseSchema<any, any, any>,
  Handler extends (inputs: v.InferInput<InputSchema>) => Promise<any>
>(inputSchema: InputSchema, handler: Handler) {
  return async function action(
    input: v.InferOutput<InputSchema>
  ): Promise<Result<ReturnType<Handler>>> {
    const parsedParams = v.safeParse(inputSchema, input);
    if (!parsedParams.success) {
      const errors = v.flatten<InputSchema>(parsedParams.issues).nested || {};

      return fail(Object.values<string>(errors)[0]);
    }

    return handler(parsedParams.output);
  };
}
