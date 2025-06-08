import React, { FormEventHandler, PropsWithChildren } from "react";
import { FieldValues, FormProviderProps } from "react-hook-form";

import {
  Form as ShadcnForm,
  FormControl,
  FormDescription,
  FormItem as ShadcnFormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SubmitButton } from "./submit-button";

type Props = { label: string; description?: string; required?: boolean };
export function FormItem({
  children,
  label,
  description,
  required,
}: PropsWithChildren<Props>) {
  return (
    <ShadcnFormItem>
      <div className="flex flex-col gap-px">
        <FormLabel className="flex items-center gap-1">
          <div className="font-bold">{label}</div>
          {required && (
            <div className="rounded-lg border border-destructive px-2 text-xs text-destructive">
              必須
            </div>
          )}
        </FormLabel>
        <FormDescription>{description}</FormDescription>
        <FormControl>{children}</FormControl>
        <FormMessage />
      </div>
    </ShadcnFormItem>
  );
}

export function Form<
  TFieldValues extends FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  children,
  onSubmit,
  submitButtonLabel,
  errorMessage,
  noSubmitButton,
  formId,
  ...props
}: PropsWithChildren<
  FormProviderProps<TFieldValues, TContext, TTransformedValues> & {
    onSubmit?: FormEventHandler<HTMLFormElement>;
    actionChildren?: React.ReactNode;
    submitButtonLabel?: string;
    submitDisabled?: boolean;
    errorMessage?: string;
    noSubmitButton?: boolean;
    formId?: string;
  }
>) {
  return (
    <ShadcnForm {...props}>
      <form
        className="flex flex-col gap-4"
        onSubmit={onSubmit}
        noValidate
        id={formId}
      >
        {children}
        {!noSubmitButton && (
          <SubmitButton className="mt-4" loading={props.formState.isSubmitting}>
            {submitButtonLabel}
          </SubmitButton>
        )}
        {errorMessage && (
          <div className="text-sm text-destructive">{errorMessage}</div>
        )}
      </form>
    </ShadcnForm>
  );
}
