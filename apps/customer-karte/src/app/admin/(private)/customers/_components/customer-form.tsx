"use client";

import { TZDate } from "@date-fns/tz";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as v from "valibot";

import { RequiredBadge } from "@/components/required-badge";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import { handleServerAction } from "@workspace/libs/server-action/client";
import { cn } from "@workspace/ui/lib/utils";

import type { Office } from "../../offices/_data/office";
import { createCustomerAction } from "../_actions/create-customer-action";
import { updateCustomerAction } from "../_actions/update-customer-action";
import { PrismaCustomer } from "@workspace/database-customer-karte";

const genderOptions = [
  { value: "Man", label: "男性" },
  { value: "Woman", label: "女性" },
  { value: "Other", label: "その他" },
] as const;

const customerFormSchema = v.object({
  firstName: v.pipe(
    v.string(),
    v.minLength(1, "名を入力してください"),
    v.maxLength(4096, "名は4096文字以内で入力してください"),
  ),
  lastName: v.pipe(
    v.string(),
    v.minLength(1, "姓を入力してください"),
    v.maxLength(4096, "姓は4096文字以内で入力してください"),
  ),
  firstNameKana: v.pipe(
    v.string(),
    v.minLength(1, "名（カナ）を入力してください"),
    v.maxLength(4096, "名（カナ）は4096文字以内で入力してください"),
    v.regex(/^[ァ-ヴー]+$/, "カタカナで入力してください"),
  ),
  lastNameKana: v.pipe(
    v.string(),
    v.minLength(1, "姓（カナ）を入力してください"),
    v.maxLength(4096, "姓（カナ）は4096文字以内で入力してください"),
    v.regex(/^[ァ-ヴー]+$/, "カタカナで入力してください"),
  ),
  birthday: v.union(
    [
      v.pipe(v.string(), v.minLength(1, "生年月日を入力してください")),
      v.date(),
    ],
    "生年月日を入力してください",
  ),
  gender: v.picklist(["Man", "Woman", "Other"], "性別を選択してください"),
  officeId: v.pipe(v.string(), v.minLength(1, "事業所を選択してください")),
});

type CustomerFormValues = v.InferInput<typeof customerFormSchema>;

type CustomerFormProps = {
  customer?: PrismaCustomer;
  offices: Office[];
};

export function CustomerForm({ customer, offices }: CustomerFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [officeOpen, setOfficeOpen] = useState(false);

  const form = useForm<CustomerFormValues>({
    resolver: valibotResolver(customerFormSchema),
    defaultValues: {
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      firstNameKana: customer?.firstNameKana || "",
      lastNameKana: customer?.lastNameKana || "",
      birthday: customer
        ? format(new TZDate(customer.birthday, "Asia/Tokyo"), "yyyy-MM-dd")
        : undefined,
      gender: customer?.gender || "Man",
      officeId: customer?.officeId || "",
    },
  });

  const onSubmit = async (values: CustomerFormValues) => {
    setErrorMessage("");

    const formattedValues = {
      ...values,
      birthday:
        values.birthday instanceof Date
          ? format(values.birthday, "yyyy-MM-dd")
          : values.birthday || "",
      officeId: values.officeId || "",
    };

    const actionPromise = customer
      ? updateCustomerAction({
          customerId: customer.customerId,
          ...formattedValues,
        })
      : createCustomerAction(formattedValues);

    const result = await handleServerAction(actionPromise);
    console.log(result);
    if (result.success) {
      toast.success(customer ? "顧客情報を更新しました" : "顧客を登録しました");
      router.push(`/admin/customers/${result.data.customerId}`);
    } else {
      setErrorMessage(
        result.message ||
          (customer
            ? "顧客情報の更新に失敗しました"
            : "顧客の登録に失敗しました"),
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                姓 <RequiredBadge />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="山田"
                  className="placeholder:text-sm max-w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                名 <RequiredBadge />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="太郎"
                  className="placeholder:text-sm max-w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastNameKana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                姓（カナ） <RequiredBadge />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="ヤマダ"
                  className="placeholder:text-sm max-w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstNameKana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                名（カナ） <RequiredBadge />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="タロウ"
                  className="placeholder:text-sm max-w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                生年月日 <RequiredBadge />
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(
                          new TZDate(
                            field.value instanceof Date
                              ? field.value
                              : new Date(field.value),
                            "Asia/Tokyo",
                          ),
                          "yyyy年MM月dd日",
                          { locale: ja },
                        )
                      ) : (
                        <span className="text-sm">生年月日を選択</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      field.value
                        ? field.value instanceof Date
                          ? field.value
                          : new Date(field.value)
                        : undefined
                    }
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    locale={ja}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                性別 <RequiredBadge />
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  {genderOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <label
                        htmlFor={option.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="officeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                事業所 <RequiredBadge />
              </FormLabel>
              <Popover open={officeOpen} onOpenChange={setOfficeOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={officeOpen}
                      className={cn(
                        "w-[400px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? offices.find(
                            (office) => office.officeId === field.value,
                          )?.name
                        : "事業所を選択"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="事業所を検索..." />
                    <CommandList>
                      <CommandEmpty>事業所が見つかりません</CommandEmpty>
                      <CommandGroup>
                        {offices.map((office) => (
                          <CommandItem
                            key={office.officeId}
                            value={office.name}
                            onSelect={() => {
                              form.setValue("officeId", office.officeId);
                              setOfficeOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === office.officeId
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {office.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <div className="flex gap-4">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? customer
                ? "更新中..."
                : "登録中..."
              : customer
                ? "更新"
                : "登録"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/customers")}
          >
            キャンセル
          </Button>
        </div>
      </form>
    </Form>
  );
}
