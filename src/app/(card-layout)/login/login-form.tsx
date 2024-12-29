"use client";

import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { Link } from "@/components/link";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailSchema, passwordSchema } from "@/domains/user/schema";
import { useForm } from "@/lib/use-form";

import { loginAction } from "./_actions";

export function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    schema: v.object({
      email: emailSchema,
      password: passwordSchema,
    }),
    onSubmit: async (params, setErrorMessage) => {
      const result = await loginAction(params);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    },
  });

  return (
    <Form {...form} submitButtonLabel="ログイン">
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
      <div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem label="パスワード">
              <Input
                {...field}
                type="password"
                autoComplete="current-password"
                className="w-full"
                disabled={form.formState.isSubmitting}
              />
            </FormItem>
          )}
        />

        <div className="mt-2 text-right">
          <Link href="/login/reset" className="text-sm">
            パスワードをお忘れですか？
          </Link>
        </div>
      </div>
    </Form>
  );
}
