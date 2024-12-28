"use client";

import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { resetAction } from "./_actions";

const formSchema = v.object({
  email: v.pipe(v.string(), v.minLength(1), v.maxLength(255), v.email()),
});
export function ResetForm() {
  const [error, setError] = useState("");
  const form = useForm<v.InferInput<typeof formSchema>>({
    defaultValues: { email: "" },
    resolver: valibotResolver(formSchema),
  });
  const handleSubmit = form.handleSubmit(async (params) => {
    const result = await resetAction(params);
    if (!result.success) {
      setError(result.message);
    }
  });

  return (
    <Form
      {...form}
      onSubmit={handleSubmit}
      submitButtonLabel="パスワードリセットメール送信"
      errorMessage={error}
    >
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem label="メールアドレス">
            <Input
              {...field}
              autoComplete="email"
              className="w-full"
              disabled={form.formState.isSubmitting}
            />
          </FormItem>
        )}
      />
    </Form>
  );
}
