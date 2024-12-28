"use client";

import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "@/lib/use-form";
import * as v from "valibot";
import { invitationAction } from "./_actions";
import { emailSchema } from "@/domains/user/schema";

export function InvitationForm() {
  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async (params, setErrorMessage) => {
      const result = await invitationAction(params);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    },
    schema: v.object({
      email: emailSchema,
    }),
  });

  return (
    <Form {...form} submitButtonLabel="登録メール送信">
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
