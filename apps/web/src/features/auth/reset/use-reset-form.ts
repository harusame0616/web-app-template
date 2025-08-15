import { useRouter } from "next/navigation";
import * as v from "valibot";

import { handleServerAction } from "@/lib/server-action/client";
import { useForm } from "@/lib/use-form";

import { resetAction } from "./actions";

const resetFormSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("メールアドレスを入力してください"),
    v.email("有効なメールアドレスを入力してください"),
  ),
});

export function useResetForm() {
  const router = useRouter();

  return useForm({
    schema: resetFormSchema,
    defaultValues: {
      email: "",
    },
    onSubmit: async (data, setErrorMessage) => {
      const result = await handleServerAction(resetAction(data));

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      router.push("/admin/reset/complete");
    },
  });
}
