"use client";

import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const formSchema = v.object({
  password: v.pipe(v.string(), v.minLength(8), v.maxLength(255)),
});
export function PasswordRegistrationForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const form = useForm<v.InferInput<typeof formSchema>>({
    defaultValues: { password: "" },
    resolver: valibotResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit(async ({ password }) => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { refresh_token } = Object.fromEntries(searchParams.entries());
    if (refresh_token) {
      await supabase.auth.refreshSession({
        refresh_token: searchParams.get("refresh_token")!,
      });
    }

    const result = await supabase.auth.updateUser({
      password,
    });
    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    router.push("/");
  });

  return (
    <Form
      {...form}
      onSubmit={handleSubmit}
      submitButtonLabel="パスワードを登録"
    >
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
