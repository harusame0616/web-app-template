"use client";

import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { loginAction } from "./_actions";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";

const formSchema = v.object({
  email: v.pipe(v.string(), v.minLength(1), v.maxLength(255), v.email()),
  password: v.pipe(v.string(), v.minLength(6), v.maxLength(255)),
});

export function LoginForm() {
  const [error, setError] = useState("");
  const form = useForm<v.InferInput<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: valibotResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit(async (params) => {
    const result = await loginAction(params);
    if (!result.success) {
      setError(result.message);
    }
  });

  return (
    <Form
      {...form}
      onSubmit={handleSubmit}
      submitButtonLabel="ログイン"
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
