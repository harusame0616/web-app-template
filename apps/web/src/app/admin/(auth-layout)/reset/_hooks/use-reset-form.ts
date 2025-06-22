import { useRouter } from "next/navigation";
import * as v from "valibot";

import { handleServerAction } from "@/lib/handle-server-action";
import { useForm } from "@/lib/use-form";

import { resetAction } from "../_actions";

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
      await handleServerAction(resetAction(data), {
        onSuccess: () => {
          router.push("/admin/reset/complete");
        },
        onFailure: setErrorMessage,
      });
    },
  });
}
