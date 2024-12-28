"use client";

import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "@/lib/use-form";
import Link from "next/link";
import * as v from "valibot";
import { loginAction } from "../_actions/login";

export function LoginForm() {
  const form = useForm({
    defaultValues: { email: "", password: "" },
    schema: v.object({
      email: v.pipe(
        v.string(),
        v.minLength(1, "メールアドレスを入力してください"),
        v.maxLength(255, "メールアドレスは最大255文字で入力してください"),
        v.email("メールアドレス形式で入力してください")
      ),
      password: v.pipe(
        v.string(),
        v.minLength(1, "パスワードを入力してください"),
        v.minLength(8, "パスワードは最低8文字で入力してください"),
        v.maxLength(255, "パスワードは最大255文字で入力してください")
      ),
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
          <FormItem
            label="メールアドレス"
            description="メールアドレスを入力してください"
          >
            <Input
              {...field}
              type="email"
              autoComplete="username"
              disabled={form.formState.isSubmitting}
            />
          </FormItem>
        )}
      />
      <div>
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem
              label="パスワード"
              description="パスワードを入力してください"
            >
              <Input
                {...field}
                type="password"
                autoComplete="username"
                disabled={form.formState.isSubmitting}
              />
            </FormItem>
          )}
        />
        <Link
          href="/signin/reset"
          className="mt-2 block text-right text-sm underline"
        >
          パスワードを忘れた場合
        </Link>
      </div>
    </Form>
  );
}
