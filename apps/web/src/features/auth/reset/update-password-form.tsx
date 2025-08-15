"use client";

import { Form, FormItem } from "@/components/form";
import { FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useUpdatePasswordForm } from "./use-update-password-form";

export function UpdatePasswordForm() {
  const form = useUpdatePasswordForm();

  return (
    <Form {...form} submitButtonLabel="パスワードを更新">
      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem label="新しいパスワード" required>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  placeholder="8文字以上で入力"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
