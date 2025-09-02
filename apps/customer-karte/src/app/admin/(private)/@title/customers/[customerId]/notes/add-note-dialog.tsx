"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Plus, Loader2, CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { addNoteAction } from "./add-note-action";

// バリデーションスキーマ
const addNoteSchema = v.object({
  text: v.pipe(
    v.string(),
    v.minLength(1, "ノート内容を入力してください"),
    v.maxLength(1000, "ノート内容は1000文字以内で入力してください"),
  ),
});

type AddNoteFormData = v.InferOutput<typeof addNoteSchema>;

type AddNoteDialogProps = {
  customerId: string;
};

export function AddNoteDialog({ customerId }: AddNoteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm<AddNoteFormData>({
    resolver: valibotResolver(addNoteSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleSubmit = async (data: AddNoteFormData): Promise<void> => {
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const result = await addNoteAction({
        customerId,
        text: data.text,
      });

      if (!result.success) {
        throw new Error(result.message ?? "ノートの追加に失敗しました");
      }

      setSubmitStatus({
        type: "success",
        message: "ノートを追加しました",
      });

      // フォームをリセット
      form.reset();

      // 成功時は少し待ってからダイアログを閉じる
      setTimeout(() => {
        setOpen(false);
        setSubmitStatus(null);
      }, 1500);
    } catch (error) {
      console.error("ノート追加エラー:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "ノートの追加に失敗しました",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ダイアログが開かれたときにステータスをリセット
  const handleOpenChange = (newOpen: boolean): void => {
    setOpen(newOpen);
    if (newOpen) {
      setSubmitStatus(null);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          ノートを追加
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>ノートを追加</DialogTitle>
          <DialogDescription>
            顧客に関する情報や対応内容を記録してください
          </DialogDescription>
        </DialogHeader>

        {submitStatus && (
          <Alert
            className={`mb-4 ${
              submitStatus.type === "success"
                ? "border-green-500 text-green-800"
                : "border-red-500 text-red-800"
            }`}
          >
            {submitStatus.type === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertDescription className="ml-2">
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ノート内容</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="顧客との会話内容、対応事項、重要な情報などを入力してください..."
                      className="min-h-[150px] resize-none transition-all duration-200 focus:ring-2"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
                className="transition-all duration-200"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={isLoading || submitStatus?.type === "success"}
                className="min-w-[80px] transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    追加中...
                  </>
                ) : (
                  "追加"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
