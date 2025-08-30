"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Form, FormItem } from "@/components/form/form";
import { FormControl, FormField } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { handleServerAction } from "@workspace/libs/server-action/client";

import { loginAction } from "./_actions/login/login-action";
import { loginFormSchema, type LoginFormValues } from "./login-form-schema";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: valibotResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const result = await handleServerAction(loginAction(data));

    if (result.success) {
      router.push("/admin/customers");
      // ルーティングが終わるまで処中にするため解決しない Promise を生成
      await new Promise(() => {});
    } else {
      form.setError("root", { message: result.message });
    }
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
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:opacity-70"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {/* <a
          href="/admin/reset"
          className="text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-primary"
        >
          パスワードをお忘れですか？
        </a> */}
      </div>
    </Form>
  );
}
