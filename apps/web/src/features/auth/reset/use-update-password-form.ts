import { handleServerAction } from "@workspace/libs/server-action/client";
import { useRouter } from "next/navigation";
import * as v from "valibot";

import { passwordSchema } from "@/domains/user/schema";
import { createClient } from "@/lib/supabase/browser";
import { useForm } from "@/lib/use-form";

import { updatePasswordAction } from "./actions";

const updatePasswordFormSchema = v.pipe(
  v.object({
    password: passwordSchema,
  }),
);

export function useUpdatePasswordForm() {
  const router = useRouter();

  return useForm({
    schema: updatePasswordFormSchema,
    defaultValues: {
      password: "",
    },
    onSubmit: async (data, setErrorMessage) => {
      // client を作成しないとパスワードリセットリンクによるログインが反映されないため作成している
      const client = createClient();
      const session = await client.auth.getSession();

      // パスワードリセットリンクによるログインが反映されていない場合はエラーを返す
      if (!session.data.session) {
        throw new Error("ログインしてください");
      }

      const result = await handleServerAction(updatePasswordAction(data));

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      router.push("/admin/users");
    },
  });
}
