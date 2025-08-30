"use client";

import { FormControl, FormField } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";

import { Form, FormItem } from "@/components/form";

import { useResetForm } from "./use-reset-form";

export function ResetForm() {
  const form = useResetForm();

  return (
    <Form {...form} submitButtonLabel="リセットメール送信">
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
      </div>
    </Form>
  );
}
