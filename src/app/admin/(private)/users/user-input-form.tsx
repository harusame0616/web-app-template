import { Form, FormItem } from "@/components/form/form";
import { FormSelect } from "@/components/form/form-select";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Result } from "@/lib/result";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { User } from "./_data/user";
import { Role } from "./role";

type UserInputFormProps = {
  formId: string;
  onSuccess: () => void;
  action: (params: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) => Promise<Result>;
  user?: User;
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
    role: v.picklist(Object.values(Role).map((role) => role.value)),
  });

  const form = useForm<v.InferInput<typeof formSchema>>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      role: user?.role || Role.Viewer.value,
    },
    resolver: valibotResolver(formSchema),
  });

  const [error, setError] = useState("");

  const handleSubmit = form.handleSubmit(async (params) => {
    setError("");

    const result = await action(params);

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
      <FormSelect
        control={form.control}
        className="w-36"
        name="role"
        label="ロール"
        options={Object.values(Role)}
      />
    </Form>
  );
}
