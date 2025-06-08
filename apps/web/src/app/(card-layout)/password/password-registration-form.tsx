"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordSchema } from "@/domains/user/schema";
import { useForm } from "@/lib/use-form";

export function PasswordRegistrationForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: { password: "" },
    schema: v.object({
      password: passwordSchema,
    }),
    onSubmit: async ({ password }, setErrorMessage) => {
      const searchParams = new URLSearchParams(
        window.location.hash.substring(1),
      );

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const { refresh_token: refreshToken } = Object.fromEntries(
        searchParams.entries(),
      );
      if (refreshToken) {
        await supabase.auth.refreshSession({
          refresh_token: searchParams.get("refresh_token")!,
        });
      }

      const result = await supabase.auth.updateUser({
        password,
      });
      if (result.error) {
        setErrorMessage(result.error.message);
        return;
      }

      router.push("/");
    },
  });

  return (
    <Form {...form} submitButtonLabel="パスワードを登録">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem label="パスワード">
            <Input
              {...field}
              autoComplete="password"
              type="password"
              className="w-full"
              disabled={form.formState.isSubmitting}
            />
          </FormItem>
        )}
      />
    </Form>
  );
}
