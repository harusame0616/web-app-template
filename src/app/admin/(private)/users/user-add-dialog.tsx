"use client";

import { Dialog } from "@/components/dialog";
import { Form, FormItem } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { UserPlus } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { addUserAction } from "./_actions/add-user-action";

const formSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  email: v.pipe(v.string(), v.minLength(1), v.email()),
});
export function UserAddDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<v.InferInput<typeof formSchema>>({
    defaultValues: { name: "", email: "" },
    resolver: valibotResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit(async (params) => {
    setError("");
    const result = await addUserAction({
      name: params.name,
      email: params.email,
    });
    if (!result.success) {
      setError(result.message);
    } else {
      setOpen(false);
    }
  });
  const formId = useId();

  useEffect(() => {
    if (open) {
      form.reset({ name: "", email: "" });
      setError("");
    }
  }, [open]);

  return (
    <Dialog
      title="ユーザー追加"
      trigger={
        <Button variant="ghost">
          <UserPlus />
          ユーザー追加
        </Button>
      }
      onOpenChange={setOpen}
      open={open}
      primaryButtonLabel="保存"
      onPrimaryButtonClick={handleSubmit}
      formId={formId}
    >
      <Form {...form} noSubmitButton formId={formId} errorMessage={error}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem label="名前" description="名前を入力してください">
              <Input
                {...field}
                autoComplete="name"
                className="max-w-32"
                disabled={form.formState.isSubmitting}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem
              label="メールアドレス"
              description="メールアドレスを入力してください"
            >
              <Input
                {...field}
                type="email"
                autoComplete="username"
                className="max-w-64"
                disabled={form.formState.isSubmitting}
              />
            </FormItem>
          )}
        />
      </Form>
    </Dialog>
  );
}
