import * as v from "valibot";

import { Form, FormItem } from "@/components/form/form";
import { FormSelect } from "@/components/form/form-select";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailSchema, nameSchema, passwordSchema } from "@/domains/user/schema";
import { Result } from "@/lib/result";
import { useForm } from "@/lib/use-form";

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
  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      role: user?.role || Role.Viewer.value,
    },
    schema: v.object({
      name: nameSchema,
      email: emailSchema,
      password: v.union([
        passwordSchema,
        ...(user ? [v.pipe(v.string(), v.length(0))] : []),
      ]),
      role: v.picklist(Object.values(Role).map((role) => role.value)),
    }),
    onSubmit: async (params, setErrorMessage) => {
      setErrorMessage("");

      const result = await action(params);

      if (!result.success) {
        setErrorMessage(result.message);
      } else {
        onSuccess();
      }
    },
  });

  return (
    <Form {...form} noSubmitButton formId={formId}>
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
