"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { MultiSelect } from "@workspace/ui/components/multi-select";

import type { Office } from "../offices/_data/office";
import type { CustomersSearchCondition } from "./customers-search-condition";

const customersSearchFormSchema = v.object({
  keyword: v.optional(v.string()),
  officeIds: v.optional(v.array(v.string())),
});

type CustomersSearchFormValues = v.InferInput<typeof customersSearchFormSchema>;

type CustomersSearchFormProps = {
  condition: CustomersSearchCondition;
  offices: Office[];
};

export function CustomersSearchForm({
  condition,
  offices,
}: CustomersSearchFormProps) {
  const router = useRouter();

  const form = useForm<CustomersSearchFormValues>({
    resolver: valibotResolver(customersSearchFormSchema),
    defaultValues: {
      keyword: condition.keyword || "",
      officeIds: condition.officeIds || [],
    },
  });

  const onSubmit = (values: CustomersSearchFormValues) => {
    const params = new URLSearchParams();

    if (values.keyword) {
      params.set("keyword", values.keyword);
    }

    values.officeIds?.forEach((id) => params.append("officeIds", id));

    router.push(`/admin/customers?${params}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 items-end flex-wrap"
      >
        <FormField
          control={form.control}
          name="officeIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>事業所</FormLabel>
              <FormControl>
                <MultiSelect
                  options={offices.map((office) => ({
                    label: office.name,
                    value: office.officeId,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="事業所を選択"
                  hideSelectAll
                  className="w-40"
                  maxCount={0}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>キーワード（名前）</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="顧客名を入力"
                  className="max-w-40"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">
          <Search className="mr-2 h-4 w-4" />
          検索
        </Button>
      </form>
    </Form>
  );
}
