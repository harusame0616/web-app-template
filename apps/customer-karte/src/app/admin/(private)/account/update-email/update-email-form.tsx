"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { handleServerAction } from "@workspace/libs/server-action/client";

import { updateMailAction } from "./_actions/update-mail-action";

const updateMailSchema = v.object({
  newEmail: v.pipe(
    v.string(),
    v.nonEmpty("メールアドレスを入力してください"),
    v.email("有効なメールアドレスを入力してください"),
  ),
});

type UpdateMailFormValues = v.InferOutput<typeof updateMailSchema>;

export function UpdateEmailForm() {
  const router = useRouter();

  const form = useForm<UpdateMailFormValues>({
    resolver: valibotResolver(updateMailSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  async function onSubmit(values: UpdateMailFormValues) {
    await handleServerAction(updateMailAction(values), {
      async onSuccess() {
        router.back();
        await new Promise(() => {});
      },
      onFailure: (message) => {
        form.setError("root", {
          message: message || "メールアドレスの更新に失敗しました",
        });
      },
    });
  }

  function handleCancel() {
    router.back();
  }

  return (
    <Card className="w-full">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>新しいメールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    更新中...
                  </>
                ) : (
                  "更新"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={form.formState.isSubmitting}
              >
                キャンセル
              </Button>
            </div>
            {form.formState.errors.root && (
              <div className="text-sm text-red-600 font-medium">
                {form.formState.errors.root.message}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
