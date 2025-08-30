"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Office } from "@workspace/database-customer-karte";
import { Result } from "@workspace/libs/result";
import { CircleAlertIcon } from "lucide-react";

const officeInputSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "事業所名を入力してください")),
});

type OfficeInputFormProps = {
  office?: Pick<Office, "name">;
  onSubmit: (data: v.InferOutput<typeof officeInputSchema>) => Promise<Result>;
  submitLabel: string;
};

export function OfficeInputForm({
  office,
  onSubmit,
  submitLabel,
}: OfficeInputFormProps) {
  const form = useForm<v.InferInput<typeof officeInputSchema>>({
    resolver: valibotResolver(officeInputSchema),
    defaultValues: {
      name: office?.name ?? "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const result = await onSubmit(data);

    if (!result.success) {
      form.setError("root", result);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>事業所名</FormLabel>
              <FormControl>
                <Input {...field} placeholder="事業所名を入力" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <Alert variant="destructive">
            <CircleAlertIcon className="size-4" />
            <AlertTitle>エラー</AlertTitle>
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
