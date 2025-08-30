import { valibotResolver } from "@hookform/resolvers/valibot";
import { Dispatch, SetStateAction, useState } from "react";
import { DefaultValues, useForm as useFormRhf } from "react-hook-form";
import * as v from "valibot";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useForm<Schema extends v.ObjectSchema<any, any>>({
  schema,
  defaultValues,
  onSubmit,
}: {
  schema: Schema;
  defaultValues: DefaultValues<v.InferInput<Schema>>;
  onSubmit: (
    values: v.InferOutput<Schema>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
  ) => Promise<void>;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const form = useFormRhf<v.InferInput<Schema>>({
    defaultValues,
    resolver: valibotResolver(schema),
  });

  return {
    ...form,
    onSubmit: form.handleSubmit(async (params) => {
      await onSubmit(params, setErrorMessage);
    }),
    errorMessage,
  };
}
