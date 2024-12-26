import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Result } from "@/lib/result";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

type UserInputFormProps = {
  formId: string;
  onSuccess: () => void;
  action: (params: {
    name: string;
    email: string;
    password: string;
  }) => Promise<Result>;
  user?: { name: string; email: string };
};
export function UserInputForm({
  onSuccess,
  action,
  formId,
  user,
}: UserInputFormProps) {
  const formSchema = v.object({
    name: v.pipe(v.string(), v.minLength(1), v.maxLength(64)),
    email: v.pipe(v.string(), v.minLength(1), v.maxLength(255), v.email()),
    password: v.union([
      v.pipe(v.string(), v.minLength(8), v.maxLength(255)),
      ...(user ? [v.pipe(v.string(), v.length(0))] : []),
    ]),
  });

  const form = useForm<v.InferInput<typeof formSchema>>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    },
    resolver: valibotResolver(formSchema),
  });

  const [error, setError] = useState("");

  const handleSubmit = form.handleSubmit(async (params) => {
    setError("");

    const result = await action({
      name: params.name,
      email: params.email,
      password: params.password,
    });

    if (!result.success) {
      setError(result.message);
    } else {
      onSuccess();
    }
  });

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
  }, [user]);

  return (
    <Form
      {...form}
      noSubmitButton
      errorMessage={error}
      onSubmit={handleSubmit}
      formId={formId}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem label="名前" description="名前を入力してください" required>
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
            required
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
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem
            label="パスワード"
            description={`パスワードを入力してください。${
              user ? "入力済みの場合のみ更新します" : ""
            }`}
            required={!user}
          >
            <Input
              {...field}
              type="password"
              autoComplete="new-password"
              className="max-w-64"
              disabled={form.formState.isSubmitting}
            />
          </FormItem>
        )}
      />
    </Form>
  );
}
