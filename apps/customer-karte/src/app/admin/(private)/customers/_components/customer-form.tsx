"use client";

import { TZDate } from "@date-fns/tz";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { RequiredBadge } from "@/components/required-badge";
import { handleServerAction } from "@workspace/libs/server-action/client";
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
  FormDescription,
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
import { Textarea } from "@workspace/ui/components/textarea";
import { cn } from "@workspace/ui/lib/utils";

import { Customer, Office } from "@workspace/database-customer-karte";
import { createCustomerAction } from "../_actions/create-customer-action";
import { updateCustomerAction } from "../_actions/update-customer-action";

const genderOptions = [
  { value: "Man", label: "男性" },
  { value: "Woman", label: "女性" },
  { value: "Other", label: "その他" },
] as const;

const customerFormSchema = v.object({
  firstName: v.pipe(
    v.string(),
    v.minLength(1, "名を入力してください"),
    v.maxLength(24, "名は24文字以内で入力してください"),
  ),
  lastName: v.pipe(
    v.string(),
    v.minLength(1, "姓を入力してください"),
    v.maxLength(24, "姓は24文字以内で入力してください"),
  ),
  firstNameKana: v.union([
    v.literal(""),
    v.pipe(
      v.string(),
      v.minLength(1, "名（カナ）を入力してください"),
      v.maxLength(24, "名（カナ）は24文字以内で入力してください"),
      v.regex(/^[ァ-ヴー]+$/, "カタカナで入力してください"),
    ),
  ]),
  lastNameKana: v.union([
    v.literal(""),
    v.pipe(
      v.string(),
      v.minLength(1, "姓（カナ）を入力してください"),
      v.maxLength(24, "姓（カナ）は24文字以内で入力してください"),
      v.regex(/^[ァ-ヴー]+$/, "カタカナで入力してください"),
    ),
  ]),
  birthday: v.nullable(v.union([v.pipe(v.string(), v.minLength(1)), v.date()])),
  gender: v.picklist(["Man", "Woman", "Other"], "性別を選択してください"),
  officeId: v.pipe(v.string(), v.minLength(1, "事業所を選択してください")),
  emails: v.array(
    v.union([
      v.literal(""),
      v.pipe(
        v.string(),
        v.minLength(1),
        v.email("有効なメールアドレスを入力してください"),
        v.maxLength(320, "メールアドレスは320文字以内で入力してください"),
      ),
    ]),
  ),
  phones: v.array(
    v.union([
      v.literal(""),
      v.pipe(
        v.string(),
        v.minLength(1),
        v.regex(
          /^[0-9-+()\s]+$/,
          "電話番号は数字、ハイフン、プラス記号、括弧、スペースのみ使用できます",
        ),
        v.maxLength(20, "電話番号は20文字以内で入力してください"),
      ),
    ]),
  ),
  addresses: v.array(
    v.union([
      v.literal(""),
      v.pipe(
        v.string(),
        v.minLength(1),
        v.maxLength(500, "住所は500文字以内で入力してください"),
      ),
    ]),
  ),
  remarks: v.pipe(
    v.string(),
    v.maxLength(5000, "備考は5000文字以内で入力してください"),
  ),
});

type CustomerFormValues = v.InferInput<typeof customerFormSchema>;

type CustomerFormProps = {
  customer?: Customer;
  offices: Pick<Office, "name" | "officeId">[];
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
      birthday: customer?.birthday
        ? format(new TZDate(customer.birthday, "Asia/Tokyo"), "yyyy-MM-dd")
        : null,
      gender: customer?.gender || "Man",
      officeId: customer?.officeId || "",
      emails: customer?.emails || [""],
      phones: customer?.phones || [""],
      addresses: customer?.addresses || [""],
      remarks: customer?.remarks || "",
    },
  });

  const onSubmit = async (values: CustomerFormValues) => {
    setErrorMessage("");

    const formattedValues = {
      ...values,
      birthday:
        values.birthday instanceof Date
          ? format(values.birthday, "yyyy-MM-dd")
          : values.birthday,
      officeId: values.officeId || "",
      emails: values.emails.filter((email) => email.trim() !== ""),
      phones: values.phones.filter((phone) => phone.trim() !== ""),
      addresses: values.addresses.filter((address) => address.trim() !== ""),
      remarks: values.remarks || "",
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
              <FormDescription>最大24文字</FormDescription>
              <FormControl>
                <Input
                  {...field}
                  className="placeholder:text-sm max-w-[200px] w-full"
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
              <FormDescription>最大24文字</FormDescription>
              <FormControl>
                <Input
                  {...field}
                  className="placeholder:text-sm max-w-[200px] w-full"
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
              <FormLabel>姓（カナ）</FormLabel>
              <FormDescription>カタカナのみ、最大24文字</FormDescription>
              <FormControl>
                <Input
                  {...field}
                  className="placeholder:text-sm max-w-[200px] w-full"
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
              <FormLabel>名（カナ）</FormLabel>
              <FormDescription>カタカナのみ、最大24文字</FormDescription>
              <FormControl>
                <Input
                  {...field}
                  className="placeholder:text-sm max-w-[200px] w-full"
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
              <FormLabel>生年月日</FormLabel>
              <div className="relative max-w-[160px]">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent z-10"
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
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
                      onSelect={(date) => {
                        field.onChange(
                          date ? format(date, "yyyy-MM-dd") : null,
                        );
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      locale={ja}
                    />
                  </PopoverContent>
                </Popover>
                <FormControl>
                  <Input
                    type="date"
                    value={
                      field.value
                        ? field.value instanceof Date
                          ? format(field.value, "yyyy-MM-dd")
                          : field.value
                        : ""
                    }
                    onChange={(e) => {
                      field.onChange(e.target.value || null);
                    }}
                    max={format(new Date(), "yyyy-MM-dd")}
                    min="1900-01-01"
                    className="pl-10 pr-10 [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                </FormControl>
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => {
                      form.setValue("birthday", null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
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
                        "w-full max-w-[400px] justify-between",
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
                <PopoverContent className="w-full max-w-[400px] p-0">
                  <Command>
                    <CommandInput />
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

        <div className="space-y-2">
          <FormLabel>メールアドレス</FormLabel>
          <FormDescription>有効なメール形式、最大320文字</FormDescription>
          {form.watch("emails").map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`emails.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="flex-1 max-w-md"
                      />
                    </FormControl>
                    {form.watch("emails").length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const emails = form.getValues("emails");
                          form.setValue(
                            "emails",
                            emails.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const emails = form.getValues("emails");
              form.setValue("emails", [...emails, ""]);
            }}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            メールアドレスを追加
          </Button>
        </div>

        <div className="space-y-2">
          <FormLabel>電話番号</FormLabel>
          <FormDescription>
            数字、ハイフン、括弧、スペース使用可、最大20文字
          </FormDescription>
          {form.watch("phones").map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`phones.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className="flex-1 max-w-xs"
                      />
                    </FormControl>
                    {form.watch("phones").length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const phones = form.getValues("phones");
                          form.setValue(
                            "phones",
                            phones.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const phones = form.getValues("phones");
              form.setValue("phones", [...phones, ""]);
            }}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            電話番号を追加
          </Button>
        </div>

        <div className="space-y-2">
          <FormLabel>住所</FormLabel>
          <FormDescription>最大500文字</FormDescription>
          {form.watch("addresses").map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`addresses.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input {...field} className="flex-1 max-w-2xl" />
                    </FormControl>
                    {form.watch("addresses").length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const addresses = form.getValues("addresses");
                          form.setValue(
                            "addresses",
                            addresses.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const addresses = form.getValues("addresses");
              form.setValue("addresses", [...addresses, ""]);
            }}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            住所を追加
          </Button>
        </div>

        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>備考</FormLabel>
              <FormDescription>最大5000文字</FormDescription>
              <FormControl>
                <Textarea {...field} className="min-h-[100px] max-w-2xl" />
              </FormControl>
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
