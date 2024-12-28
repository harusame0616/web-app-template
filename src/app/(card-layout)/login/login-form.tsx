"use client";

import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "@/lib/use-form";
import Link from "next/link";
import * as v from "valibot";
import { loginAction } from "./_actions";

const formSchema = v.object({
  email: v.pipe(v.string(), v.minLength(1), v.maxLength(255), v.email()),
});

export function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    schema: v.object({
      email: v.pipe(v.string(), v.minLength(1), v.maxLength(255), v.email()),
      password: v.pipe(v.string(), v.minLength(6), v.maxLength(255)),
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

        <Link
          href="/login/reset"
          className="underline mt-2 block text-right text-sm"
        >
          パスワードをお忘れですか？
        </Link>
      </div>
    </Form>
  );
}
