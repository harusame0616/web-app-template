import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { FormControl, FormField } from "@/components/ui/form";
import { emailSchema, passwordSchema } from "@/domains/user/schema";
import { PasswordInput } from "@/features/auth/login/password-input";
import { useRouter } from "next/navigation";


export function MemberLoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Member's Area</CardTitle>
        <CardDescription>メンバー専用ページににログイン</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginFormPresenter />
      </CardContent>
    </Card>
  );
}

const loginFormSchema = v.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormSchema = v.InferOutput<typeof loginFormSchema>;

type LoginFormProps = {
  showForgetPasswordLink?: boolean;
};
export function LoginFormPresenter({ showForgetPasswordLink }: LoginFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormSchema>({
    resolver: valibotResolver(loginFormSchema),
    defaultValues: {
      email: "yamada@example.com",
      password: "demo-system",
    },
  });

  async function onSubmit() {
    router.push('/member/threads')
  }

  return (
    <Form
      {...form}
      onSubmit={form.handleSubmit(onSubmit)}
      submitButtonLabel="ログイン"
    >
      <div className="grid gap-6">
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
