"use client";

import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailSchema } from "@/domains/user/schema";
import { useForm } from "@/lib/use-form";

import { invitationAction } from "./_actions";

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
    <Form {...form} submitButtonLabel="仮登録メール送信">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem
            label="メールアドレス"
            description="仮登録メールを送信するメールアドレスを入力してください。"
          >
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
