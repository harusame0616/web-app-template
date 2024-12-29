"use client";

import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailSchema } from "@/domains/user/schema";
import { useForm } from "@/lib/use-form";

import { resetAction } from "./_actions";

export function ResetForm() {
  const form = useForm({
    defaultValues: { email: "" },
    schema: v.object({
      email: emailSchema,
    }),
    onSubmit: async (params, setErrorMessage) => {
      const result = await resetAction(params);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    },
  });

  return (
    <Form {...form} submitButtonLabel="リセットメール送信">
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
