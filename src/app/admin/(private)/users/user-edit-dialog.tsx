import { Dialog } from "@/components/dialog";
import { Form, FormItem } from "@/components/form/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ComponentProps, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { editUserAction } from "./_actions/edit-user-action";

const formSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  email: v.pipe(v.string(), v.minLength(1), v.email()),
});
type Props = Omit<ComponentProps<typeof Dialog>, "children"> & {
  userId: string;
  name: string;
  email: string;
};
export function UserEditDialog({
  open,
  onOpenChange,
  name,
  email,
  userId,
}: Props) {
  const [error, setError] = useState("");
  const form = useForm<v.InferInput<typeof formSchema>>({
    defaultValues: { name, email },
    resolver: valibotResolver(formSchema),
  });

  const handleSubmit = form.handleSubmit(async (params) => {
    setError("");
    const result = await editUserAction({
      userId,
      name: params.name,
      email: params.email,
    });
    if (!result.success) {
      setError(result.message);
    } else {
      onOpenChange(false);
    }
  });
  const formId = useId();

  useEffect(() => {
    if (open) {
      form.reset({ name, email });
      setError("");
    }
  }, [open]);

  return (
    <Dialog
      title="ユーザー編集"
      onOpenChange={onOpenChange}
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
