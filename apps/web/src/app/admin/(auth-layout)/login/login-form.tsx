"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Form, FormItem } from "@/components/form/form";
import { FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleServerAction } from "@/lib/handle-server-action";

import { loginAction } from "./_actions/login/login-action";
import { loginFormSchema, type LoginFormValues } from "./login-form-schema";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: valibotResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await handleServerAction(loginAction(data), {
      onSuccess: () => {
        router.push("/admin");
      },
      onFailure: (message) => {
        form.setError("root", {
          message,
        });
      },
    });
  };
  return (
    <Form
      {...form}
      onSubmit={form.handleSubmit(onSubmit)}
      submitButtonLabel="ログイン"
      errorMessage={form.formState.errors.root?.message}
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
                <Input {...field} type="password" />
              </FormControl>
            </FormItem>
          )}
        />
        <a
          href="/admin/reset"
          className="text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-primary"
        >
          パスワードをお忘れですか？
        </a>
      </div>
    </Form>
  );
}
