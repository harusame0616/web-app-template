"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { FormControl, FormField } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { emailSchema, passwordSchema } from "@/domains/user/schema";

import { PasswordInput } from "./password-input";
import { useLogin } from "./use-login";

const loginFormSchema = v.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormSchema = v.InferOutput<typeof loginFormSchema>;

type LoginFormProps = {
  showForgetPasswordLink?: boolean;
};
export function LoginFormPresenter({ showForgetPasswordLink }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending, errorMessage } = useLogin();

  const form = useForm<LoginFormSchema>({
    resolver: valibotResolver(loginFormSchema),
    defaultValues: {
      email: "yamada@example.com",
      password: "demo-system",
    },
  });

  async function onSubmit({ email, password }: LoginFormSchema) {
    // router.push('/')
    login(email, password, "/admin/users");
  }

  return (
    <Form
      {...form}
      onSubmit={form.handleSubmit(onSubmit)}
      submitButtonLabel="ログイン"
      errorMessage={errorMessage}
      submitDisabled={isPending}
    >
      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem label="メールアドレス" required>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="admin@example.com"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem label="パスワード" required>
              <FormControl>
                <PasswordInput
                  {...field}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {showForgetPasswordLink && (
          <Link
            href="/admin/reset"
            className="text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-primary"
          >
            パスワードをお忘れですか？
          </Link>
        )}
      </div>
    </Form>
  );
}
