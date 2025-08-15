"use client";

import { Form, FormItem } from "@/components/form";
import { FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
