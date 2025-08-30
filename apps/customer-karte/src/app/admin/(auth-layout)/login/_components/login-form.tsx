"use client";

import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { Link } from "@/components/link";
import { FormField } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { emailSchema, passwordSchema } from "@/domains/user/schema";
import { useForm } from "@/lib/use-form";

import { loginAction } from "../_actions/login";

export function LoginForm() {
  const form = useForm({
    defaultValues: { email: "", password: "" },
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
            <FormItem label="パスワード">
              <Input
                {...field}
                type="password"
                autoComplete="username"
                disabled={form.formState.isSubmitting}
              />
            </FormItem>
          )}
        />
        <div className="mt-2 text-right">
          <Link href="/signin/reset" className="text-sm">
            パスワードを忘れた場合
          </Link>
        </div>
      </div>
    </Form>
  );
}
